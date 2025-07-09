import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCaseProcessingStatus } from '@/services/alegiApiService';

interface ProcessingStage {
  name: string;
  status: 'pending' | 'started' | 'completed' | 'failed';
  error?: string;
}

interface DocumentProcessing {
  totalDocuments: number;
  completed: number;
  failed: number;
  extractions: Array<{
    fileName: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    error?: string;
  }>;
}

interface DataFusion {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

interface ExternalData {
  precedentCases: number;
  courtListenerCases: number;
}

interface ProcessingError {
  stage: string;
  error: string;
}

interface ProcessingStatus {
  progress: {
    percentage: number;
    currentStage: string;
  };
  stages: ProcessingStage[];
  documentProcessing: DocumentProcessing;
  dataFusion?: DataFusion;
  externalData: ExternalData;
  errors: ProcessingError[];
}

export const useCaseProcessingStatus = (caseId: string) => {
  const { session } = useAuth();
  const [status, setStatus] = useState<ProcessingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!session || !caseId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await getCaseProcessingStatus(caseId, session);
      setStatus(response.status);
    } catch (err) {
      console.error('Error fetching processing status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch status');
    } finally {
      setLoading(false);
    }
  }, [caseId, session]);

  const refreshStatus = useCallback(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    fetchStatus();
    
    // Poll every 5 seconds if still processing
    const interval = setInterval(() => {
      if (status?.progress.percentage < 100) {
        fetchStatus();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [caseId, session, status?.progress.percentage, fetchStatus]);

  return {
    status,
    loading,
    error,
    refreshStatus
  };
}; 