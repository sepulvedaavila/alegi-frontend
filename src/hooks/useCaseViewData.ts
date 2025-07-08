import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCaseViewData } from '@/services/alegiApiService';

export interface CaseViewData {
  case: any;
  plaintiffs: any[];
  defendants: any[];
  attorneys: any[];
  legalIssues: any[];
  evidence: any[];
  documents: any[];
  aiData: {
    enrichment: any;
    predictions: any;
    analysis: any;
  };
  status: {
    processingStatus: string;
    aiProcessed: boolean;
    lastAiUpdate: string | null;
    hasAiData: boolean;
  };
  metadata: {
    caseId: string;
    fetchedAt: string;
  };
}

export interface UseCaseViewDataResult {
  data: CaseViewData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCaseViewData = (caseId: string | undefined): UseCaseViewDataResult => {
  const { session } = useAuth();
  const [data, setData] = useState<CaseViewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!caseId || !session) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getCaseViewData(caseId, session);
      setData(response);
    } catch (err) {
      console.error('Error fetching case view data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch case data'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [caseId, session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
};