import { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

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
  return useSmartPolling(
    ['case-probability', caseId],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/probability`);
      if (!response.ok) {
        throw new Error('Failed to fetch case probability');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 30000, // Consider data fresh for 30 seconds
    }
  );
};

export const useSettlementAnalysis = (caseId: string) => {
  return useSmartPolling(
    ['settlement-analysis', caseId],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/settlement-analysis`);
      if (!response.ok) {
        throw new Error('Failed to fetch settlement analysis');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 60000, // Consider data fresh for 1 minute
    }
  );
};

export const usePrecedentAnalysis = (caseId: string, page: number = 1) => {
  return useSmartPolling(
    ['precedents', caseId, page.toString()],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/precedents?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error('Failed to fetch precedents');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 300000, // Consider data fresh for 5 minutes
    }
  );
};

export const useJudgeTrends = (caseId: string) => {
  return useSmartPolling(
    ['judge-trends', caseId],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/judge-trends`);
      if (!response.ok) {
        throw new Error('Failed to fetch judge trends');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useRiskAssessment = (caseId: string) => {
  return useSmartPolling(
    ['risk-assessment', caseId],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/risk-assessment`);
      if (!response.ok) {
        throw new Error('Failed to fetch risk assessment');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 300000, // Consider data fresh for 5 minutes
    }
  );
};

export const useCostEstimate = (caseId: string, strategy: string = 'standard') => {
  return useSmartPolling(
    ['cost-estimate', caseId, strategy],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/cost-estimate?strategy=${strategy}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cost estimate');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useFinancialPrediction = (caseId: string) => {
  return useSmartPolling(
    ['financial-prediction', caseId],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/financial-prediction`);
      if (!response.ok) {
        throw new Error('Failed to fetch financial prediction');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 300000, // Consider data fresh for 5 minutes
    }
  );
};

export const useResolutionTimeline = (caseId: string) => {
  return useSmartPolling(
    ['resolution-timeline', caseId],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/cases/${caseId}/timeline`);
      if (!response.ok) {
        throw new Error('Failed to fetch resolution timeline');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useAnalyzedCasesStats = () => {
  return useSmartPolling(
    ['analyzed-cases-stats'],
    async () => {
      // TODO: Replace with actual API call
      const response = await fetch('/api/analyzed-cases/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch analyzed cases stats');
      }
      return response.json();
    },
    {
      staleTime: 900000, // Consider data fresh for 15 minutes
    }
  );
};

export const useSimilarCases = (caseId: string, searchTerm?: string) => {
  return useSmartPolling(
    ['similar-cases', caseId, searchTerm],
    async () => {
      // TODO: Replace with actual API call
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(`/api/cases/${caseId}/similar?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch similar cases');
      }
      return response.json();
    },
    {
      enabled: !!caseId,
      staleTime: 600000, // Consider data fresh for 10 minutes
    }
  );
};

export const useLawUpdates = (jurisdiction?: string) => {
  return useSmartPolling(
    ['law-updates', jurisdiction],
    async () => {
      // TODO: Replace with actual API call
      const params = new URLSearchParams();
      if (jurisdiction) params.append('jurisdiction', jurisdiction);
      
      const response = await fetch(`/api/law-updates?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch law updates');
      }
      return response.json();
    },
    {
      staleTime: 1800000, // Consider data fresh for 30 minutes
    }
  );
}; 