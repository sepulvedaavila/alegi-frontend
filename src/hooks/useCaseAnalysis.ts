import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCompleteAnalysis } from '@/services/caseAnalysisService';
import { fetchComprehensiveCaseData } from '@/services/supabaseCaseDataService';

export interface CaseAnalysisData {
  // API Analysis Results
  probability: any;
  riskAssessment: any;
  precedents: any;
  judgeAnalysis: any;
  settlementAnalysis: any;
  financialPrediction: any;
  timelineEstimate: any;
  costEstimate: any;
  
  // Supabase Data
  predictions: any;
  enrichment: any;
  similarCases: any[];
  analysis: any[];
  
  // Status
  isLoading: boolean;
  errors: any[];
  lastUpdated: Date | null;
}

export const useCaseAnalysis = (caseId: string | undefined) => {
  const { session } = useAuth();
  const [data, setData] = useState<CaseAnalysisData>({
    probability: null,
    riskAssessment: null,
    precedents: null,
    judgeAnalysis: null,
    settlementAnalysis: null,
    financialPrediction: null,
    timelineEstimate: null,
    costEstimate: null,
    predictions: null,
    enrichment: null,
    similarCases: [],
    analysis: [],
    isLoading: false,
    errors: [],
    lastUpdated: null
  });

  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  const fetchAnalysisData = useCallback(async (showLoading = true) => {
    if (!caseId || !session) {
      return;
    }

    if (showLoading) {
      setData(prev => ({ ...prev, isLoading: true, errors: [] }));
    }

    try {
      // Fetch both API analysis and Supabase data
      const [apiAnalysis, supabaseData] = await Promise.allSettled([
        fetchCompleteAnalysis(caseId, session),
        fetchComprehensiveCaseData(caseId)
      ]);

      const apiResult = apiAnalysis.status === 'fulfilled' ? apiAnalysis.value : null;
      const supabaseResult = supabaseData.status === 'fulfilled' ? supabaseData.value : null;

      const allErrors = [
        ...(apiResult?.errors || []),
        ...(supabaseResult?.errors || [])
      ];

      setData({
        // API Data
        probability: apiResult?.probability || null,
        riskAssessment: apiResult?.riskAssessment || null,
        precedents: apiResult?.precedents || null,
        judgeAnalysis: apiResult?.judgeAnalysis || null,
        settlementAnalysis: apiResult?.settlementAnalysis || null,
        financialPrediction: apiResult?.financialPrediction || null,
        timelineEstimate: apiResult?.timelineEstimate || null,
        costEstimate: apiResult?.costEstimate || null,
        
        // Supabase Data
        predictions: supabaseResult?.predictions || null,
        enrichment: supabaseResult?.enrichment || null,
        similarCases: supabaseResult?.similarCases || [],
        analysis: supabaseResult?.analysis || [],
        
        // Status
        isLoading: false,
        errors: allErrors,
        lastUpdated: new Date()
      });

      // If we have pending analysis, set up polling
      const hasPendingAnalysis = allErrors.some(error => 
        error.error?.message?.includes('not be processed yet')
      );

      if (hasPendingAnalysis && !refreshInterval) {
        console.log('Case analysis pending, setting up polling...');
        const interval = setInterval(() => {
          fetchAnalysisData(false); // Refresh without loading indicator
        }, 15000); // Poll every 15 seconds

        setRefreshInterval(interval);
      } else if (!hasPendingAnalysis && refreshInterval) {
        // Clear polling if analysis is complete
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }

    } catch (error) {
      console.error('Error fetching case analysis:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        errors: [{ type: 'general', error }]
      }));
    }
  }, [caseId, session, refreshInterval]);

  const refreshAnalysis = useCallback(() => {
    fetchAnalysisData(true);
  }, [fetchAnalysisData]);

  // Initial fetch and cleanup
  useEffect(() => {
    fetchAnalysisData();

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [fetchAnalysisData]);

  // Helper functions to check data availability
  const hasAnyData = useCallback(() => {
    return !!(data.probability || data.predictions || data.enrichment || 
              data.similarCases.length > 0 || data.analysis.length > 0);
  }, [data]);

  const isAnalysisComplete = useCallback(() => {
    return !!(data.probability && data.riskAssessment && data.predictions);
  }, [data]);

  const getAnalysisStatus = useCallback(() => {
    if (data.isLoading) return 'loading';
    if (data.errors.length > 0 && !hasAnyData()) return 'failed';
    if (isAnalysisComplete()) return 'complete';
    if (hasAnyData()) return 'partial';
    return 'pending';
  }, [data, hasAnyData, isAnalysisComplete]);

  return {
    ...data,
    refreshAnalysis,
    hasAnyData: hasAnyData(),
    isAnalysisComplete: isAnalysisComplete(),
    analysisStatus: getAnalysisStatus()
  };
}; 