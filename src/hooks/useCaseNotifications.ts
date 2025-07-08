import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getValidJWTToken, createAuthHeaders, handleAuthError } from '@/utils/auth';

export interface CaseNotification {
  type: 'case_processing_started' | 'case_processing_completed' | 'case_processing_failed';
  caseId: string;
  caseName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  message: string;
  results?: {
    hasEnrichment: boolean;
    hasPrediction: boolean;
    caseType: string;
    complexity: string;
  };
  error?: string;
  timestamp: string;
}

export interface CaseStatus {
  caseId: string;
  caseName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  lastUpdate: string;
  caseStage: string;
  timestamp: string;
}

interface UseCaseNotificationsOptions {
  caseId?: string;
  pollingInterval?: number;
  enableWebSocket?: boolean;
}

const useCaseNotifications = (options: UseCaseNotificationsOptions = {}) => {
  const { caseId, pollingInterval = 5000, enableWebSocket = true } = options;
  const { session } = useAuth();
  
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [notification, setNotification] = useState<CaseNotification | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  // Get backend URL from environment or use default
  const getBackendUrl = () => {
    return import.meta.env.VITE_BACKEND_URL || 'https://alegi-backend.vercel.app';
  };

  // Get WebSocket URL
  const getWebSocketUrl = () => {
    const backendUrl = getBackendUrl();
    // Replace http/https with ws/wss
    const wsUrl = backendUrl.replace(/^https?:\/\//, 'ws://');
    return `${wsUrl}/ws`;
  };

  // Get JWT token with validation and refresh
  const getJwtToken = useCallback(async () => {
    return await getValidJWTToken(session);
  }, [session]);

  // WebSocket connection
  const connectWebSocket = useCallback(async () => {
    if (!enableWebSocket || !caseId) return;

    const token = await getJwtToken();
    if (!token) {
      console.warn('No JWT token available for WebSocket connection');
      startPolling();
      return;
    }

    try {
      const wsUrl = getWebSocketUrl();
      const ws = new WebSocket(`${wsUrl}?token=${token}`);
      
      ws.onopen = () => {
        setIsConnected(true);
        setIsPolling(false);
        setError(null);
        reconnectAttemptsRef.current = 0;
        console.log('WebSocket connected');
        
        // Subscribe to case updates
        ws.send(JSON.stringify({
          type: 'subscribe_case',
          caseId
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data: CaseNotification = JSON.parse(event.data);
          
          switch (data.type) {
            case 'case_processing_started':
              setStatus('processing');
              setNotification(data);
              toast.info('Case processing started', {
                description: data.message,
                duration: 5000,
              });
              break;
            case 'case_processing_completed':
              setStatus('completed');
              setNotification(data);
              toast.success('Case processing completed', {
                description: data.message,
                duration: 8000,
              });
              break;
            case 'case_processing_failed':
              setStatus('failed');
              setNotification(data);
              toast.error('Case processing failed', {
                description: data.error || data.message,
                duration: 10000,
              });
              break;
          }
        } catch (parseError) {
          console.error('Error parsing WebSocket message:', parseError);
        }
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        console.log('WebSocket disconnected:', event.code, event.reason);
        
        // Attempt reconnection with exponential backoff
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.pow(2, reconnectAttemptsRef.current) * 1000;
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            connectWebSocket();
          }, delay);
        } else {
          // Fallback to polling after max attempts
          startPolling();
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        setError('WebSocket connection failed');
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setError('Failed to establish WebSocket connection');
      startPolling();
    }
  }, [caseId, enableWebSocket, getJwtToken]);

  // Polling fallback
  const startPolling = useCallback(async () => {
    if (!caseId) return;

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    setIsPolling(true);
    setIsConnected(false);
    console.log('Starting polling for case status');

    let lastUpdate = new Date().toISOString();

    const pollCaseStatus = async () => {
      try {
        const headers = await createAuthHeaders(session);
        if (!headers) {
          console.warn('No valid JWT token available for polling');
          return;
        }

        // Use conditional polling endpoint if available, fallback to regular status
        const response = await fetch(`${getBackendUrl()}/api/cases/${caseId}/updates?lastUpdate=${lastUpdate}`, {
          headers
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // If there are updates, use them; otherwise fallback to regular status check
          if (data.hasUpdates) {
            setStatus(data.status);
            setError(null);
            lastUpdate = data.timestamp || new Date().toISOString();
            
            // Stop polling if completed or failed
            if (data.status === 'completed' || data.status === 'failed') {
              clearInterval(pollingIntervalRef.current!);
              setIsPolling(false);
            }
          } else {
            // No updates, check regular status as fallback
            const statusResponse = await fetch(`${getBackendUrl()}/api/cases/${caseId}/status`, {
              headers
            });
            
            if (statusResponse.ok) {
              const statusData: CaseStatus = await statusResponse.json();
              setStatus(statusData.status);
              setError(null);
              
              // Stop polling if completed or failed
              if (statusData.status === 'completed' || statusData.status === 'failed') {
                clearInterval(pollingIntervalRef.current!);
                setIsPolling(false);
              }
            }
          }
        } else if (response.status === 401) {
          setError('Authentication failed');
          clearInterval(pollingIntervalRef.current!);
          setIsPolling(false);
        } else if (response.status === 404) {
          setError('Case not found');
          clearInterval(pollingIntervalRef.current!);
          setIsPolling(false);
        } else {
          console.error('Polling error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Polling error:', error);
        setError('Failed to fetch case status');
      }
    };

    // Poll immediately, then at intervals
    pollCaseStatus();
    pollingIntervalRef.current = setInterval(pollCaseStatus, pollingInterval);
  }, [caseId, pollingInterval, session]);

  // Check WebSocket availability
  const checkWebSocketAvailability = useCallback(async () => {
    if (!enableWebSocket) {
      startPolling();
      return;
    }

    try {
      const headers = await createAuthHeaders(session);
      if (!headers) {
        console.warn('No valid JWT token available for WebSocket availability check');
        startPolling();
        return;
      }

      const response = await fetch(`${getBackendUrl()}/api/realtime/stats`, {
        headers
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.available) {
          connectWebSocket();
        } else {
          console.log('WebSocket not available, using polling');
          startPolling();
        }
      } else {
        console.log('WebSocket availability check failed, using polling');
        startPolling();
      }
    } catch (error) {
      console.error('Failed to check WebSocket availability:', error);
      startPolling();
    }
  }, [enableWebSocket, connectWebSocket, startPolling, session]);

  // Manual status refresh
  const refreshStatus = useCallback(async () => {
    if (!caseId) return;

    try {
      const headers = await createAuthHeaders(session);
      if (!headers) {
        setError('No authentication token available');
        return;
      }

      const response = await fetch(`${getBackendUrl()}/api/cases/${caseId}/status`, {
        headers
      });
      
      if (response.ok) {
        const data: CaseStatus = await response.json();
        setStatus(data.status);
        setError(null);
      } else {
        setError(`Failed to fetch status: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error refreshing status:', error);
      setError('Failed to refresh case status');
    }
  }, [caseId, session]);

  // Subscribe to a specific case
  const subscribeToCase = useCallback((newCaseId: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'subscribe_case',
        caseId: newCaseId
      }));
    }
  }, []);

  // Unsubscribe from a specific case
  const unsubscribeFromCase = useCallback((newCaseId: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'unsubscribe_case',
        caseId: newCaseId
      }));
    }
  }, []);

  // Send ping to keep connection alive
  const sendPing = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'ping'
      }));
    }
  }, []);

  // Initialize connection when caseId changes
  useEffect(() => {
    if (caseId) {
      checkWebSocketAvailability();
    }

    return () => {
      // Cleanup
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [caseId, checkWebSocketAvailability]);

  // Set up ping interval for WebSocket
  useEffect(() => {
    if (isConnected) {
      const pingInterval = setInterval(sendPing, 30000); // Ping every 30 seconds
      return () => clearInterval(pingInterval);
    }
  }, [isConnected, sendPing]);

  return {
    status,
    notification,
    isConnected,
    isPolling,
    error,
    refreshStatus,
    subscribeToCase,
    unsubscribeFromCase,
    sendPing
  };
};

export default useCaseNotifications; 