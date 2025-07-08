import { useAuth } from '@/contexts/AuthContext';
import { 
  getCaseProbability,
  getCaseRiskAssessment,
  getCaseCostEstimate,
  getCaseFinancialPrediction,
  getCaseSettlementAnalysis,
  getCaseTimelineEstimate,
  getCasePrecedents,
  getJudgeTrends,
  findSimilarCases,
  fetchCompleteAnalysis
} from './alegiApiService';

// Re-export the functions from alegiApiService for backward compatibility
export const fetchCaseProbabilityAnalysis = getCaseProbability;
export const fetchCaseRiskAssessment = getCaseRiskAssessment;
export const fetchCaseCostEstimate = getCaseCostEstimate;
export const fetchCaseFinancialPrediction = getCaseFinancialPrediction;
export const fetchCaseSettlementAnalysis = getCaseSettlementAnalysis;
export const fetchCaseTimelineEstimate = getCaseTimelineEstimate;
export const fetchCasePrecedents = getCasePrecedents;
export const fetchJudgeAnalysis = getJudgeTrends;
export const fetchSimilarCases = findSimilarCases;

// Export the comprehensive analysis function
export { fetchCompleteAnalysis }; 