import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CaseStatus } from '@/hooks/useCaseNotifications';
import { retryWithBackoff } from '@/utils/apiRetry';

export interface UserCaseStatus {
  caseId: string;
  caseName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  lastUpdate: string;
  caseStage: string;
  createdAt: string;
}

export interface CaseStatusResponse {
  cases: UserCaseStatus[];
  timestamp: string;
}

// Get backend URL from environment or use default
const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL || 'https://alegi-backend.vercel.app';
  console.log('Using backend URL:', url); // Add logging for debugging
  return url;
};

// Get JWT token from Supabase session
const getJwtToken = (session: any) => {
  return session?.access_token;
};

/**
 * Fetches status for all cases belonging to the current user
 */
export const fetchAllUserCasesStatus = async (session: any): Promise<UserCaseStatus[]> => {
  const result = await retryWithBackoff(async () => {
    const token = getJwtToken(session);
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${getBackendUrl()}/api/cases/status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      } else if (response.status === 403) {
        throw new Error('Access denied');
      } else {
        throw new Error(`Failed to fetch cases status: ${response.statusText}`);
      }
    }

    const data: CaseStatusResponse = await response.json();
    return data.cases;
  });

  if (!result) {
    throw new Error('Failed to fetch user cases status after retries');
  }

  return result;
};

/**
 * Fetches status for a specific case
 */
export const fetchCaseStatus = async (caseId: string, session: any): Promise<CaseStatus> => {
  const result = await retryWithBackoff(async () => {
    const token = getJwtToken(session);
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${getBackendUrl()}/api/cases/${caseId}/status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      } else if (response.status === 403) {
        throw new Error('Access denied');
      } else if (response.status === 404) {
        throw new Error('Case not found');
      } else {
        throw new Error(`Failed to fetch case status: ${response.statusText}`);
      }
    }

    const data: CaseStatus = await response.json();
    return data;
  });

  if (!result) {
    throw new Error('Failed to fetch case status after retries');
  }

  return result;
};

/**
 * Checks if WebSocket service is available
 */
export const checkWebSocketAvailability = async (session: any): Promise<boolean> => {
  const result = await retryWithBackoff(async () => {
    const token = getJwtToken(session);
    if (!token) {
      console.warn('No JWT token available for WebSocket availability check');
      return false;
    }

    const response = await fetch(`${getBackendUrl()}/api/realtime/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.available || false;
    }

    return false;
  });

  return result || false;
};

/**
 * Fetches enhanced status for a specific case with processing timestamps
 */
export const fetchEnhancedCaseStatus = async (caseId: string, session: any): Promise<any> => {
  const result = await retryWithBackoff(async () => {
    const token = getJwtToken(session);
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${getBackendUrl()}/api/cases/${caseId}/enhanced-status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      } else if (response.status === 403) {
        throw new Error('Access denied');
      } else if (response.status === 404) {
        throw new Error('Case not found');
      } else {
        throw new Error(`Failed to fetch enhanced case status: ${response.statusText}`);
      }
    }

    const data = await response.json();
    return data;
  });

  if (!result) {
    throw new Error('Failed to fetch enhanced case status after retries');
  }

  return result;
};

/**
 * Checks for case updates since last check
 */
export const checkCaseUpdates = async (caseId: string, lastUpdate: string, session: any): Promise<any> => {
  const result = await retryWithBackoff(async () => {
    const token = getJwtToken(session);
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${getBackendUrl()}/api/cases/${caseId}/updates?lastUpdate=${lastUpdate}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      } else if (response.status === 403) {
        throw new Error('Access denied');
      } else if (response.status === 404) {
        throw new Error('Case not found');
      } else {
        throw new Error(`Failed to check case updates: ${response.statusText}`);
      }
    }

    const data = await response.json();
    return data;
  });

  if (!result) {
    throw new Error('Failed to check case updates after retries');
  }

  return result;
};

/**
 * Checks backend health and available features
 */
export const checkBackendHealth = async (): Promise<any> => {
  const result = await retryWithBackoff(async () => {
    const response = await fetch(`${getBackendUrl()}/api/health`);

    if (!response.ok) {
      throw new Error(`Backend health check failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  });

  if (!result) {
    throw new Error('Failed to check backend health after retries');
  }

  return result;
};

/**
 * Hook for managing all user cases status
 */
export const useAllCasesStatus = () => {
  const { session } = useAuth();
  const [casesStatus, setCasesStatus] = React.useState<UserCaseStatus[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchStatus = React.useCallback(async () => {
    if (!session) {
      setCasesStatus([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const statuses = await fetchAllUserCasesStatus(session);
      setCasesStatus(statuses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cases status');
      setCasesStatus([]);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const refreshStatus = React.useCallback(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Fetch status on mount and when session changes
  React.useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Auto-refresh every 30 seconds for cases that are still processing
  React.useEffect(() => {
    const hasProcessingCases = casesStatus.some(
      caseStatus => caseStatus.status === 'pending' || caseStatus.status === 'processing'
    );

    if (hasProcessingCases) {
      const interval = setInterval(() => {
        fetchStatus();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [casesStatus, fetchStatus]);

  return {
    casesStatus,
    isLoading,
    error,
    refreshStatus
  };
};

/**
 * Hook for managing a single case status
 */
export const useSingleCaseStatus = (caseId: string) => {
  const { session } = useAuth();
  const [caseStatus, setCaseStatus] = React.useState<CaseStatus | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchStatus = React.useCallback(async () => {
    if (!session || !caseId) {
      setCaseStatus(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const status = await fetchCaseStatus(caseId, session);
      setCaseStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch case status');
      setCaseStatus(null);
    } finally {
      setIsLoading(false);
    }
  }, [session, caseId]);

  const refreshStatus = React.useCallback(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Fetch status on mount and when caseId or session changes
  React.useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Auto-refresh every 10 seconds if case is still processing
  React.useEffect(() => {
    if (caseStatus && (caseStatus.status === 'pending' || caseStatus.status === 'processing')) {
      const interval = setInterval(() => {
        fetchStatus();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [caseStatus, fetchStatus]);

  return {
    caseStatus,
    isLoading,
    error,
    refreshStatus
  };
}; 