import { useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
// Backend API imports removed - only Supabase communication
import { 
  getCaseStatus,
  getEnhancedCaseStatus,
  getCaseUpdates,
  getAllUserCasesStatus,
  getCaseProbability,
  getCaseRiskAssessment,
  getCaseCostEstimate,
  getCaseFinancialPrediction,
  getCaseSettlementAnalysis,
  getCaseTimelineEstimate,
  getCasePrecedents,
  getJudgeTrends,
  findSimilarCases,
  fetchCompleteAnalysis,
  checkBackendHealth,
  getRealtimeStats,
  getOpenAIRateLimits
} from '@/services/alegiApiService';
import { useStatusPolling } from '@/services/statusPollingService';

/**
 * Hook for using the Alegi API with authentication
 */
export const useAlegiApi = () => {
  const { session } = useAuth();
  const statusPolling = useStatusPolling(session);

  // Check if user is authenticated
  const isAuthenticated = useMemo(() => !!session, [session]);

  // Case Management - Backend API functions removed
  const submitCase = useCallback(async (caseData: any) => {
    if (!session) throw new Error('Not authenticated');
    throw new Error('Case submission to backend API is disabled - use Supabase only');
  }, [session]);

  const uploadDocument = useCallback(async (caseId: string, file: File) => {
    if (!session) throw new Error('Not authenticated');
    throw new Error('Document upload to backend API is disabled - use Supabase only');
  }, [session]);

  const triggerAnalysis = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    throw new Error('Analysis triggering to backend API is disabled - use Supabase only');
  }, [session]);

  // Status and Updates
  const getStatus = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseStatus(caseId, session);
  }, [session]);

  const getEnhancedStatus = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getEnhancedCaseStatus(caseId, session);
  }, [session]);

  const getUpdates = useCallback(async (caseId: string, lastUpdate: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseUpdates(caseId, lastUpdate, session);
  }, [session]);

  const getUserCasesStatus = useCallback(async () => {
    if (!session) throw new Error('Not authenticated');
    return getAllUserCasesStatus(session);
  }, [session]);

  // Analysis
  const getProbability = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseProbability(caseId, session);
  }, [session]);

  const getRiskAssessment = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseRiskAssessment(caseId, session);
  }, [session]);

  const getCostEstimate = useCallback(async (caseId: string, strategy: string = 'standard') => {
    if (!session) throw new Error('Not authenticated');
    return getCaseCostEstimate(caseId, strategy, session);
  }, [session]);

  const getFinancialPrediction = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseFinancialPrediction(caseId, session);
  }, [session]);

  const getSettlementAnalysis = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseSettlementAnalysis(caseId, session);
  }, [session]);

  const getTimelineEstimate = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCaseTimelineEstimate(caseId, session);
  }, [session]);

  const getPrecedents = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getCasePrecedents(caseId, session);
  }, [session]);

  const getJudgeAnalysis = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return getJudgeTrends(caseId, session);
  }, [session]);

  const getSimilarCases = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return findSimilarCases(caseId, session);
  }, [session]);

  const getCompleteAnalysis = useCallback(async (caseId: string) => {
    if (!session) throw new Error('Not authenticated');
    return fetchCompleteAnalysis(caseId, session);
  }, [session]);

  // System
  const getHealth = useCallback(async () => {
    return checkBackendHealth();
  }, []);

  const getStats = useCallback(async () => {
    if (!session) throw new Error('Not authenticated');
    return getRealtimeStats(session);
  }, [session]);

  const getRateLimits = useCallback(async () => {
    if (!session) throw new Error('Not authenticated');
    return getOpenAIRateLimits(session);
  }, [session]);

  return {
    // Authentication state
    session,
    isAuthenticated,
    
    // Case Management
    submitCase,
    uploadDocument,
    triggerAnalysis,
    
    // Status and Updates
    getStatus,
    getEnhancedStatus,
    getUpdates,
    getUserCasesStatus,
    
    // Analysis
    getProbability,
    getRiskAssessment,
    getCostEstimate,
    getFinancialPrediction,
    getSettlementAnalysis,
    getTimelineEstimate,
    getPrecedents,
    getJudgeAnalysis,
    getSimilarCases,
    getCompleteAnalysis,
    
    // System
    getHealth,
    getStats,
    getRateLimits,
    
    // Status Polling
    ...statusPolling
  };
}; 