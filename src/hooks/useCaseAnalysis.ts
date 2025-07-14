import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCompleteAnalysis } from '@/services/caseAnalysisService';
import { fetchComprehensiveCaseData } from '@/services/supabaseCaseDataService';
// Removed backend API imports - analysis triggering disabled

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
  caseStatus: any;
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
    lastUpdated: null,
    caseStatus: null
  });

  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  const checkCaseStatus = useCallback(async () => {
    if (!caseId || !session) {
      return null;
    }

    try {
      // Status checking disabled - backend API removed
      console.warn('Case status checking disabled - backend API removed');
      return null;
    } catch (error) {
      console.warn('Error checking case status:', error);
      return null;
    }
  }, [caseId, session]);

  const triggerAnalysisIfNeeded = useCallback(async (status: any) => {
    if (!caseId || !session || !status) {
      return;
    }

    // Analysis triggering disabled - backend API removed
    if (!status.ai_processed && status.processing_status !== 'processing' && status.processing_status !== 'completed') {
      try {
        console.log('Analysis triggering disabled - backend API removed');
        // Analysis triggering is disabled - only Supabase communication
      } catch (error) {
        console.warn('Error triggering analysis:', error);
      }
    }
  }, [caseId, session]);

  const fetchAnalysisData = useCallback(async (showLoading = true) => {
    if (!caseId || !session) {
      return;
    }

    if (showLoading) {
      setData(prev => ({ ...prev, isLoading: true, errors: [] }));
    }

    try {
      // Step 1: Check case status first
      const status = await checkCaseStatus();
      
      if (status) {
        setData(prev => ({ ...prev, caseStatus: status }));
        
        // Step 2: Trigger analysis if needed
        await triggerAnalysisIfNeeded(status);
        
        // Step 3: Fetch analysis data based on processing status
        if (status.ai_processed || status.processing_status === 'processing' || status.processing_status === 'completed') {
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

          setData(prev => ({
            ...prev,
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
          }));

          // Set up polling if case is still processing through linear pipeline
          if (status.processing_status === 'processing' && !refreshInterval) {
            console.log('Linear pipeline is processing, setting up polling...');
            const interval = setInterval(() => {
              fetchAnalysisData(false); // Refresh without loading indicator
            }, 30000); // Poll every 30 seconds

            setRefreshInterval(interval);
          } else if (status.processing_status !== 'processing' && refreshInterval) {
            // Clear polling if case is no longer processing
            clearInterval(refreshInterval);
            setRefreshInterval(null);
          }
        } else {
          // Case not processed yet, set loading to false
          setData(prev => ({
            ...prev,
            isLoading: false,
            lastUpdated: new Date()
          }));
        }
      } else {
        // No status available, set loading to false
        setData(prev => ({
          ...prev,
          isLoading: false,
          errors: [{ type: 'status', error: new Error('Unable to check case status') }]
        }));
      }

    } catch (error) {
      console.warn('Error fetching case analysis:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        errors: [{ type: 'general', error }]
      }));
    }
  }, [caseId, session, refreshInterval, checkCaseStatus, triggerAnalysisIfNeeded]);

  const refreshAnalysis = useCallback(() => {
    fetchAnalysisData(true);
  }, [fetchAnalysisData]);

  const triggerEnhancedAnalysis = useCallback(async () => {
    if (!caseId || !session) {
      return;
    }

    try {
      // Enhanced analysis triggering disabled - backend API removed
      console.log('Enhanced analysis triggering disabled - backend API removed');
      // Refresh analysis data after triggering enhanced processing
      setTimeout(() => {
        fetchAnalysisData(true);
      }, 2000);
    } catch (error) {
      console.warn('Error triggering enhanced analysis:', error);
    }
  }, [caseId, session, fetchAnalysisData]);

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
              data.similarCases.length > 0 || data.analysis.length > 0 ||
              data.caseStatus?.ai_processed);
  }, [data]);

  const isAnalysisComplete = useCallback(() => {
    // For linear pipeline, check if the case has been fully processed
    if (data.caseStatus?.processing_status === 'completed' && data.caseStatus?.ai_processed) {
      return true;
    }
    // Fallback to checking individual analysis components
    return !!(data.probability && data.riskAssessment && data.predictions);
  }, [data]);

  const getAnalysisStatus = useCallback(() => {
    if (data.isLoading) return 'loading';
    
    // Check case status first for linear pipeline states
    if (data.caseStatus?.processing_status === 'processing') return 'processing';
    if (data.caseStatus?.processing_status === 'completed' && hasAnyData()) return 'complete';
    if (data.caseStatus?.processing_status === 'failed') return 'failed';
    
    // Fallback to analysis data states
    if (data.errors.length > 0 && !hasAnyData()) return 'failed';
    if (isAnalysisComplete()) return 'complete';
    if (hasAnyData()) return 'partial';
    
    // Check if case has been processed through linear pipeline
    if (data.caseStatus?.ai_processed) return 'complete';
    
    return 'pending';
  }, [data, hasAnyData, isAnalysisComplete]);

  // Memoize the return value to prevent unnecessary re-renders
  const memoizedReturn = useMemo(() => ({
    ...data,
    refreshAnalysis,
    triggerEnhancedAnalysis,
    hasAnyData: hasAnyData(),
    isAnalysisComplete: isAnalysisComplete(),
    analysisStatus: getAnalysisStatus()
  }), [
    data,
    refreshAnalysis,
    triggerEnhancedAnalysis,
    hasAnyData,
    isAnalysisComplete,
    getAnalysisStatus
  ]);

  return memoizedReturn;
}; 