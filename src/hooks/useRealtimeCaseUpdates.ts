import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface CaseProcessingUpdate {
  caseId: string;
  processingStatus: string;
  enhancedProcessingStatus: string;
  aiProcessed: boolean;
  lastUpdated: string;
}

interface UseRealtimeCaseUpdatesOptions {
  onUpdate?: (update: CaseProcessingUpdate) => void;
  onError?: (error: Error) => void;
}

interface UseRealtimeCaseUpdatesResult {
  isConnected: boolean;
  lastUpdate: CaseProcessingUpdate | null;
  error: Error | null;
  subscribe: (caseId: string) => void;
  unsubscribe: () => void;
}

export const useRealtimeCaseUpdates = (
  options: UseRealtimeCaseUpdatesOptions = {}
): UseRealtimeCaseUpdatesResult => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<CaseProcessingUpdate | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [subscribedCaseId, setSubscribedCaseId] = useState<string | null>(null);

  const subscribe = (caseId: string) => {
    // Unsubscribe from any existing channel
    if (channel) {
      channel.unsubscribe();
    }

    // Create new channel for case updates
    const newChannel = supabase
      .channel(`case-updates-${caseId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'case_briefs',
          filter: `id=eq.${caseId}`
        },
        (payload) => {
          console.log('Case brief updated:', payload);
          
          const update: CaseProcessingUpdate = {
            caseId,
            processingStatus: payload.new.processing_status || 'pending',
            enhancedProcessingStatus: payload.new.enhanced_processing_status || 'pending',
            aiProcessed: payload.new.ai_processed || false,
            lastUpdated: new Date().toISOString()
          };

          setLastUpdate(update);
          
          if (options.onUpdate) {
            options.onUpdate(update);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_predictions',
          filter: `case_id=eq.${caseId}`
        },
        (payload) => {
          console.log('Case predictions added:', payload);
          
          const update: CaseProcessingUpdate = {
            caseId,
            processingStatus: 'completed',
            enhancedProcessingStatus: 'completed',
            aiProcessed: true,
            lastUpdated: new Date().toISOString()
          };

          setLastUpdate(update);
          
          if (options.onUpdate) {
            options.onUpdate(update);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_analysis',
          filter: `case_id=eq.${caseId}`
        },
        (payload) => {
          console.log('Case analysis added:', payload);
          
          const update: CaseProcessingUpdate = {
            caseId,
            processingStatus: 'processing',
            enhancedProcessingStatus: 'processing',
            aiProcessed: false,
            lastUpdated: new Date().toISOString()
          };

          setLastUpdate(update);
          
          if (options.onUpdate) {
            options.onUpdate(update);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'case_ai_enrichment',
          filter: `case_id=eq.${caseId}`
        },
        (payload) => {
          console.log('Case AI enrichment added:', payload);
          
          const update: CaseProcessingUpdate = {
            caseId,
            processingStatus: 'processing',
            enhancedProcessingStatus: 'processing',
            aiProcessed: false,
            lastUpdated: new Date().toISOString()
          };

          setLastUpdate(update);
          
          if (options.onUpdate) {
            options.onUpdate(update);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setError(null);
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          const error = new Error('Failed to subscribe to real-time updates');
          setError(error);
          
          if (options.onError) {
            options.onError(error);
          }
        } else if (status === 'TIMED_OUT') {
          setIsConnected(false);
          const error = new Error('Real-time subscription timed out');
          setError(error);
          
          if (options.onError) {
            options.onError(error);
          }
        }
      });

    setChannel(newChannel);
    setSubscribedCaseId(caseId);
  };

  const unsubscribe = () => {
    if (channel) {
      channel.unsubscribe();
      setChannel(null);
      setSubscribedCaseId(null);
      setIsConnected(false);
      setError(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  // Reconnect if connection is lost
  useEffect(() => {
    if (!isConnected && subscribedCaseId && !error) {
      const reconnectTimer = setTimeout(() => {
        console.log('Attempting to reconnect to real-time updates...');
        subscribe(subscribedCaseId);
      }, 5000); // Retry after 5 seconds

      return () => clearTimeout(reconnectTimer);
    }
  }, [isConnected, subscribedCaseId, error]);

  return {
    isConnected,
    lastUpdate,
    error,
    subscribe,
    unsubscribe
  };
};

// Hook for subscribing to multiple case updates (for dashboard)
export const useRealtimeCasesUpdates = (
  userCaseIds: string[],
  options: UseRealtimeCaseUpdatesOptions = {}
): UseRealtimeCaseUpdatesResult => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<CaseProcessingUpdate | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const subscribe = () => {
    // Unsubscribe from any existing channel
    if (channel) {
      channel.unsubscribe();
    }

    if (userCaseIds.length === 0) {
      return;
    }

    // Create new channel for multiple case updates
    const newChannel = supabase
      .channel('user-cases-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'case_briefs'
        },
        (payload) => {
          // Only process if this case belongs to the user
          if (userCaseIds.includes(payload.new.id)) {
            console.log('User case updated:', payload);
            
            const update: CaseProcessingUpdate = {
              caseId: payload.new.id,
              processingStatus: payload.new.processing_status || 'pending',
              enhancedProcessingStatus: payload.new.enhanced_processing_status || 'pending',
              aiProcessed: payload.new.ai_processed || false,
              lastUpdated: new Date().toISOString()
            };

            setLastUpdate(update);
            
            if (options.onUpdate) {
              options.onUpdate(update);
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('Multi-case subscription status:', status);
        
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setError(null);
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          const error = new Error('Failed to subscribe to real-time updates');
          setError(error);
          
          if (options.onError) {
            options.onError(error);
          }
        }
      });

    setChannel(newChannel);
  };

  const unsubscribe = () => {
    if (channel) {
      channel.unsubscribe();
      setChannel(null);
      setIsConnected(false);
      setError(null);
    }
  };

  // Subscribe when case IDs change
  useEffect(() => {
    if (userCaseIds.length > 0) {
      subscribe();
    }

    return () => {
      unsubscribe();
    };
  }, [userCaseIds]);

  return {
    isConnected,
    lastUpdate,
    error,
    subscribe: () => subscribe(),
    unsubscribe
  };
};