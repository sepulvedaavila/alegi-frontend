import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CaseStatus } from '@/hooks/useCaseNotifications';
import { 
  getCaseStatus as getCaseStatusFromApi,
  getEnhancedCaseStatus as getEnhancedCaseStatusFromApi,
  getCaseUpdates as getCaseUpdatesFromApi,
  getAllUserCasesStatus as getAllUserCasesStatusFromApi,
  checkBackendHealth as checkBackendHealthFromApi,
  getRealtimeStats as getRealtimeStatsFromApi
} from './alegiApiService';

export interface UserCaseStatus {
  caseId: string;
  caseName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  lastUpdate: string;
  caseStage: string;
  createdAt: string;
}

// Re-export the functions from alegiApiService for backward compatibility
export const fetchAllUserCasesStatus = getAllUserCasesStatusFromApi;
export const fetchCaseStatus = getCaseStatusFromApi;
export const fetchEnhancedCaseStatus = getEnhancedCaseStatusFromApi;
export const checkCaseUpdates = getCaseUpdatesFromApi;
export const checkBackendHealth = checkBackendHealthFromApi;
export const getRealtimeStats = getRealtimeStatsFromApi;

/**
 * Checks if WebSocket service is available
 */
export const checkWebSocketAvailability = async (session: any): Promise<boolean> => {
  try {
    const data = await getRealtimeStatsFromApi(session);
    return data.available || false;
  } catch (error) {
    console.warn('WebSocket availability check failed:', error);
    return false;
  }
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