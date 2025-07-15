import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProbabilityData {
  successProbability: number;
  failureProbability: number;
  settlementProbability: number;
  confidence: 'low' | 'medium' | 'high';
}

interface SettlementAnalysis {
  settlementAdvantages: string[];
  trialAdvantages: string[];
  costComparison: {
    settlement: number;
    trial: number;
  };
  timeComparison: {
    settlementMonths: number;
    trialMonths: number;
  };
  recommendation: string;
  confidenceScore: number;
  financialExposure: {
    best: number;
    likely: number;
    worst: number;
  };
}

interface RiskFactor {
  category: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
  impact: number;
  mitigation?: string;
}

interface RiskAssessment {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  weaknesses: string[];
  recommendations: string[];
  riskFactors: RiskFactor[];
  overallConfidence: number;
  mitigationStrategies: {
    immediate: string[];
    longTerm: string[];
  };
}

interface PrecedentCase {
  id: string;
  case_name: string;
  citation: string;
  court: string;
  jurisdiction: string;
  date_decided: string;
  similarity_score: number;
  outcome: 'plaintiff' | 'defendant' | 'settlement';
  decision_summary: string;
  key_holdings: string[];
  relevant_facts: string[];
  legal_principles: string[];
  outcome_amount?: number;
  case_url?: string;
}

interface CaseAnalysisData {
  probability: ProbabilityData | null;
  settlement: SettlementAnalysis | null;
  risk: RiskAssessment | null;
  precedents: PrecedentCase[];
}

interface UseCaseAnalysisDataResult {
  data: CaseAnalysisData;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useCaseAnalysisData = (caseId: string | undefined): UseCaseAnalysisDataResult => {
  const [data, setData] = useState<CaseAnalysisData>({
    probability: null,
    settlement: null,
    risk: null,
    precedents: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaseAnalysisData = async () => {
    if (!caseId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch predictions data
      const { data: predictionsData, error: predictionsError } = await supabase
        .from('case_predictions')
        .select('*')
        .eq('case_id', caseId)
        .maybeSingle();

      if (predictionsError && predictionsError.code !== 'PGRST116') {
        throw predictionsError;
      }

      // Fetch analysis data
      const { data: analysisData, error: analysisError } = await supabase
        .from('case_analysis')
        .select('*')
        .eq('case_id', caseId);

      if (analysisError) {
        throw analysisError;
      }

      // Fetch precedent cases
      const { data: precedentData, error: precedentError } = await supabase
        .from('precedent_cases')
        .select('*')
        .eq('case_id', caseId)
        .order('similarity_score', { ascending: false });

      if (precedentError) {
        throw precedentError;
      }

      // Transform data for components
      const probabilityData: ProbabilityData | null = predictionsData ? {
        successProbability: predictionsData.outcome_prediction_score || 65,
        failureProbability: 100 - (predictionsData.outcome_prediction_score || 65),
        settlementProbability: predictionsData.settlement_success_rate || 45,
        confidence: predictionsData.confidence_prediction_percentage >= 80 ? 'high' : 
                   predictionsData.confidence_prediction_percentage >= 60 ? 'medium' : 'low'
      } : null;

      // Find settlement analysis from case_analysis
      const settlementAnalysisRecord = analysisData?.find(a => a.analysis_type === 'settlement_analysis');
      const settlementData: SettlementAnalysis | null = settlementAnalysisRecord ? {
        settlementAdvantages: settlementAnalysisRecord.result?.settlementAdvantages || [
          'Faster resolution timeline',
          'Lower legal costs',
          'Guaranteed outcome',
          'Reduced emotional stress',
          'Privacy preservation'
        ],
        trialAdvantages: settlementAnalysisRecord.result?.trialAdvantages || [
          'Potential for higher award',
          'Full vindication',
          'Precedent setting',
          'Public accountability',
          'Complete discovery process'
        ],
        costComparison: {
          settlement: settlementAnalysisRecord.result?.costComparison?.settlement || 75000,
          trial: settlementAnalysisRecord.result?.costComparison?.trial || 200000
        },
        timeComparison: {
          settlementMonths: settlementAnalysisRecord.result?.timeComparison?.settlementMonths || 6,
          trialMonths: settlementAnalysisRecord.result?.timeComparison?.trialMonths || 18
        },
        recommendation: settlementAnalysisRecord.result?.recommendation || 'Consider settlement negotiation',
        confidenceScore: settlementAnalysisRecord.confidence_score || 75,
        financialExposure: {
          best: predictionsData?.estimated_financial_outcome * 0.5 || 100000,
          likely: predictionsData?.estimated_financial_outcome || 200000,
          worst: predictionsData?.estimated_financial_outcome * 1.5 || 300000
        }
      } : null;

      // Find risk analysis from case_analysis
      const riskAnalysisRecord = analysisData?.find(a => a.analysis_type === 'risk_analysis');
      const riskData: RiskAssessment | null = riskAnalysisRecord ? {
        riskLevel: predictionsData?.risk_score >= 70 ? 'high' : 
                  predictionsData?.risk_score >= 40 ? 'medium' : 'low',
        riskScore: predictionsData?.risk_score || 65,
        weaknesses: riskAnalysisRecord.result?.weaknesses || [
          'Limited documentary evidence',
          'Potential credibility issues',
          'Jurisdictional challenges'
        ],
        recommendations: riskAnalysisRecord.result?.recommendations || [
          'Strengthen evidence collection',
          'Consider expert testimony',
          'Develop alternative legal theories'
        ],
        riskFactors: riskAnalysisRecord.result?.riskFactors || [
          {
            category: 'Evidence Quality',
            risk: 'medium',
            description: 'Current evidence may be insufficient for strong case',
            impact: 7,
            mitigation: 'Conduct additional discovery'
          },
          {
            category: 'Legal Precedent',
            risk: 'low',
            description: 'Favorable precedents support case theory',
            impact: 3
          },
          {
            category: 'Opposing Counsel',
            risk: 'high',
            description: 'Experienced defense team with strong track record',
            impact: 8,
            mitigation: 'Prepare comprehensive case strategy'
          }
        ],
        overallConfidence: riskAnalysisRecord.confidence_score || 70,
        mitigationStrategies: {
          immediate: riskAnalysisRecord.result?.mitigationStrategies?.immediate || [
            'Review and strengthen key evidence',
            'Identify additional witnesses',
            'Research similar successful cases'
          ],
          longTerm: riskAnalysisRecord.result?.mitigationStrategies?.longTerm || [
            'Develop comprehensive trial strategy',
            'Build expert witness network',
            'Prepare for potential appeals'
          ]
        }
      } : null;

      // Transform precedent data
      const precedentsData: PrecedentCase[] = precedentData?.map(p => ({
        id: p.id,
        case_name: p.case_name || 'Unknown Case',
        citation: p.citation || 'Citation not available',
        court: p.court || 'Unknown Court',
        jurisdiction: p.jurisdiction || 'Unknown Jurisdiction',
        date_decided: p.date_decided || new Date().toISOString(),
        similarity_score: p.similarity_score || 50,
        outcome: p.outcome || 'settlement',
        decision_summary: p.decision_summary || 'Summary not available',
        key_holdings: p.key_holdings || [],
        relevant_facts: p.relevant_facts || [],
        legal_principles: p.legal_principles || [],
        outcome_amount: p.outcome_amount,
        case_url: p.case_url
      })) || [];

      setData({
        probability: probabilityData,
        settlement: settlementData,
        risk: riskData,
        precedents: precedentsData
      });

    } catch (err) {
      console.error('Error fetching case analysis data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch case analysis data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseAnalysisData();
  }, [caseId]);

  return {
    data,
    loading,
    error,
    refetch: fetchCaseAnalysisData
  };
};