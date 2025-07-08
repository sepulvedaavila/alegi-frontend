import { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { 
  fetchCaseProbabilityAnalysis,
  fetchSettlementAnalysis,
  fetchCasePrecedents,
  fetchJudgeAnalysis,
  fetchCaseRiskAssessment,
  fetchCostEstimate,
  fetchFinancialPrediction,
  fetchTimelineEstimate
} from '@/services/caseAnalysisService';
import { useAuthenticatedApi } from './useAuthenticatedApi';

// Smart polling hook for real-time updates
export const useSmartPolling = <TData>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn' | 'refetchInterval'>
) => {
  const [pollingInterval, setPollingInterval] = useState(5000); // Start at 5s
  const [lastDataHash, setLastDataHash] = useState<string>('');

  // Create a hash of the data to detect changes
  const createDataHash = (data: TData): string => {
    return JSON.stringify(data);
  };

  const query = useQuery({
    queryKey,
    queryFn,
    refetchInterval: pollingInterval,
    ...options,
  });

  // Handle success and error effects
  useEffect(() => {
    if (query.data) {
      const currentHash = createDataHash(query.data);
      
      // If data hasn't changed, gradually increase polling interval
      if (currentHash === lastDataHash) {
        setPollingInterval(prev => Math.min(prev * 1.2, 60000)); // Max 1 minute
      } else {
        // Data changed, reset to faster polling
        setPollingInterval(5000);
        setLastDataHash(currentHash);
      }
    }
  }, [query.data, lastDataHash]);

  useEffect(() => {
    if (query.error) {
      // Reduce polling on errors
      setPollingInterval(60000);
    }
  }, [query.error]);

  // Reset polling when query key changes
  useEffect(() => {
    setPollingInterval(5000);
    setLastDataHash('');
  }, [JSON.stringify(queryKey)]);

  return {
    ...query,
    pollingInterval,
    setPollingInterval
  };
};

// Widget-specific polling hooks
export const useCaseProbability = (caseId: string) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['case-probability', caseId],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchCaseProbabilityAnalysis(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch case probability');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 30000, // Consider data fresh for 30 seconds
    }
  );
};

export const useSettlementAnalysis = (caseId: string) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['settlement-analysis', caseId],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchSettlementAnalysis(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch settlement analysis');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 60000, // Consider data fresh for 1 minute
    }
  );
};

export const usePrecedentAnalysis = (caseId: string, page: number = 1) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['precedents', caseId, page.toString()],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchCasePrecedents(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch precedents');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 300000, // Consider data fresh for 5 minutes
    }
  );
};

export const useJudgeTrends = (caseId: string) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['judge-trends', caseId],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchJudgeAnalysis(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch judge trends');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useRiskAssessment = (caseId: string) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['risk-assessment', caseId],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchCaseRiskAssessment(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch risk assessment');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 300000, // Consider data fresh for 5 minutes
    }
  );
};

export const useCostEstimate = (caseId: string, strategy: string = 'standard') => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['cost-estimate', caseId, strategy],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchCostEstimate(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch cost estimate');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useFinancialPrediction = (caseId: string) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['financial-prediction', caseId],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchFinancialPrediction(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch financial prediction');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 300000, // Consider data fresh for 5 minutes
    }
  );
};

export const useResolutionTimeline = (caseId: string) => {
  const { session } = useAuth();
  
  return useSmartPolling(
    ['resolution-timeline', caseId],
    async () => {
      if (!session) {
        throw new Error('No session available');
      }
      const result = await fetchTimelineEstimate(caseId, session);
      if (!result) {
        throw new Error('Failed to fetch resolution timeline');
      }
      return result;
    },
    {
      enabled: !!caseId && !!session,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useAnalyzedCasesStats = () => {
  const { get } = useAuthenticatedApi();
  
  return useSmartPolling(
    ['analyzed-cases-stats'],
    async () => {
      return await get('/api/analyzed-cases/stats');
    },
    {
      staleTime: 900000, // Consider data fresh for 15 minutes
    }
  );
};

export const useSimilarCases = (caseId: string, searchTerm?: string) => {
  const { get } = useAuthenticatedApi();
  
  return useSmartPolling(
    ['similar-cases', caseId, searchTerm],
    async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      
      return await get(`/api/cases/${caseId}/similar?${params}`);
    },
    {
      enabled: !!caseId,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useLawUpdates = (jurisdiction?: string) => {
  const { get } = useAuthenticatedApi();
  
  return useSmartPolling(
    ['law-updates', jurisdiction],
    async () => {
      const params = new URLSearchParams();
      if (jurisdiction) params.append('jurisdiction', jurisdiction);
      
      return await get(`/api/law-updates?${params}`);
    },
    {
      staleTime: 1800000, // Consider data fresh for 30 minutes
    }
  );
}; 