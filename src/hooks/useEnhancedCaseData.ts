import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getEnhancedCaseData } from '@/services/alegiApiService';

interface DataQuality {
  fusionConfidence: number;
  averageExtractionConfidence: number;
  hasDocumentExtractions: boolean;
  hasPrecedentCases: boolean;
}

interface FusedData {
  parties?: {
    plaintiffs?: string[];
    defendants?: string[];
  };
  legalClaims?: string[];
  damagesSought?: string;
  conflicts?: string[];
  additionalInsights?: string[];
}

interface DocumentAnalysis {
  totalDocuments: number;
  documents: Array<{
    fileName: string;
    documentType: string;
    confidence: number;
    processingStatus: string;
    legalClaims?: string[];
    parties?: {
      plaintiffs?: string[];
      defendants?: string[];
    };
    damagesSought?: string;
  }>;
}

interface PrecedentAnalysis {
  totalPrecedents: number;
  precedents: Array<{
    caseName: string;
    citation: string;
    court: string;
    jurisdiction: string;
    judgeName: string;
    similarityScore: number;
    outcome: string;
    legalIssues?: string[];
    decisionSummary?: string;
    fullTextUrl?: string;
  }>;
}

interface AIEnrichment {
  enhancedCaseType: string;
  causeOfAction: string;
  applicableStatute: string;
  jurisdictionEnriched: string;
  courtAbbreviation: string;
}

interface EnhancedData {
  dataQuality: DataQuality;
  fusedData?: FusedData;
  documentAnalysis: DocumentAnalysis;
  precedentAnalysis: PrecedentAnalysis;
  aiEnrichment?: AIEnrichment;
}

export const useEnhancedCaseData = (caseId: string) => {
  const { session } = useAuth();
  const [enhancedData, setEnhancedData] = useState<EnhancedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnhancedData = useCallback(async () => {
    if (!session || !caseId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const response = await getEnhancedCaseData(caseId, session);
      setEnhancedData(response.enhancedData);
    } catch (err) {
      console.error('Error fetching enhanced data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch enhanced data');
    } finally {
      setLoading(false);
    }
  }, [caseId, session]);

  const refreshData = useCallback(() => {
    fetchEnhancedData();
  }, [fetchEnhancedData]);

  useEffect(() => {
    fetchEnhancedData();
  }, [fetchEnhancedData]);

  return {
    enhancedData,
    loading,
    error,
    refreshData
  };
}; 