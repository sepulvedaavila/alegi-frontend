import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCaseViewData } from '@/services/alegiApiService';

export interface CaseViewData {
  case: {
    id: string;
    user_id: string;
    case_name: string;
    case_type: string;
    case_stage: string;
    jurisdiction: string;
    date_filed: string;
    case_narrative: string;
    history_narrative: string;
    applicable_law: string;
    expected_outcome: string;
    additional_notes: string;
    attorneys_of_record: string;
    assigned_judge: string;
    court: string;
    processing_status: string;
    ai_processed: boolean;
    last_ai_update: string;
    success_probability: number;
    risk_level: string;
    created_at: string;
    updated_at: string;
  };
  plaintiffs: Array<{
    id: string;
    case_id: string;
    name: string;
    type: string;
    contact_info: string;
    created_at: string;
  }>;
  defendants: Array<{
    id: string;
    case_id: string;
    name: string;
    type: string;
    contact_info: string;
    created_at: string;
  }>;
  attorneys: Array<{
    id: string;
    case_id: string;
    name: string;
    firm: string;
    role: string;
    contact_info: string;
    created_at: string;
  }>;
  legalIssues: Array<{
    id: string;
    case_id: string;
    issue_type: string;
    description: string;
    severity: string;
    created_at: string;
  }>;
  evidence: Array<{
    id: string;
    case_id: string;
    evidence_type: string;
    description: string;
    file_path: string;
    submitted_by: string;
    created_at: string;
  }>;
  documents: Array<{
    id: string;
    case_id: string;
    file_name: string;
    file_type: string;
    file_size: number;
    uploaded_by: string;
    processing_status: string;
    created_at: string;
  }>;
  enhancedData: {
    fusedData: {
      status: string;
      confidence: number;
      parties: {
        plaintiffs: string[];
        defendants: string[];
      };
      legalClaims: string[];
      damagesSought: {
        amount: number;
        currency: string;
        types: string[];
      };
      keyDates: {
        contract_date?: string;
        breach_date?: string;
        filing_date?: string;
      };
      conflicts: string[];
      additionalInsights: string;
      fusionTimestamp: string;
    };
    documentAnalysis: {
      totalDocuments: number;
      documents: Array<{
        fileName: string;
        documentType: string;
        parties: string[];
        legalClaims: string[];
        damagesSought: number;
        keyDates: string[];
        jurisdiction: string;
        caseNumber: string;
        processingStatus: string;
        extractionTimestamp: string;
        confidence: number;
      }>;
    };
    precedentAnalysis: {
      totalPrecedents: number;
      precedents: Array<{
        caseName: string;
        citation: string;
        court: string;
        jurisdiction: string;
        judgeName: string;
        legalIssues: string[];
        applicableStatutes: string[];
        strategyUsed: string;
        outcome: string;
        decisionSummary: string;
        similarityScore: number;
        fullTextUrl: string;
      }>;
    };
  };
  aiData: {
    enrichment: {
      id: string;
      case_id: string;
      enrichment_data: {
        case_complexity: string;
        estimated_duration: string;
        key_legal_issues: string[];
        recommended_strategies: string[];
        risk_factors: string[];
      };
      created_at: string;
    };
    predictions: {
      id: string;
      case_id: string;
      outcome_prediction_score: number;
      confidence_prediction_percentage: number;
      settlement_probability: number;
      estimated_settlement_range: {
        low: number;
        likely: number;
        high: number;
      };
      estimated_trial_duration: string;
      key_factors: string[];
      created_at: string;
    };
    analysis: {
      risk_assessment: {
        result: {
          overall_risk: string;
          risk_factors: string[];
          mitigation_strategies: string[];
        };
        confidenceScore: number;
        factors: string[];
        createdAt: string;
        updatedAt: string;
      };
      cost_estimate: {
        result: {
          total_estimated_cost: number;
          breakdown: {
            attorney_fees: number;
            expert_witnesses: number;
            court_costs: number;
            other_expenses: number;
          };
          cost_range: {
            low: number;
            high: number;
          };
        };
        confidenceScore: number;
        factors: string[];
        createdAt: string;
        updatedAt: string;
      };
      settlement_analysis: {
        result: {
          settlement_probability: number;
          optimal_settlement_range: {
            low: number;
            recommended: number;
            high: number;
          };
          settlement_factors: string[];
        };
        confidenceScore: number;
        factors: string[];
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  status: {
    processingStatus: string;
    aiProcessed: boolean;
    lastAiUpdate: string;
    hasAiData: boolean;
    hasEnhancedData: boolean;
  };
  dataQuality: {
    hasFusedData: boolean;
    hasDocumentExtractions: boolean;
    hasPrecedentCases: boolean;
    hasAIEnrichment: boolean;
    hasPredictions: boolean;
    hasAnalysisResults: boolean;
    fusionConfidence: number;
    averageExtractionConfidence: number;
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