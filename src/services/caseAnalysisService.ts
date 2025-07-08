import { useAuth } from '@/contexts/AuthContext';
import { retryWithBackoff } from '@/utils/apiRetry';
import { getValidJWTToken, createAuthHeaders, handleAuthError } from '@/utils/auth';

// Get backend URL from environment or use default
const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL || 'https://alegi-backend.vercel.app';
  console.log('Using backend URL:', url); // Add logging for debugging
  return url;
};

// Generic API call wrapper with error handling and token refresh
const makeAPICall = async (endpoint: string, session: any) => {
  if (!session) {
    console.error('No session available for API call:', endpoint);
    return null;
  }

  const headers = await createAuthHeaders(session);
  if (!headers) {
    console.error('Failed to create auth headers for API call:', endpoint);
    return null;
  }

  console.log(`Making API call to: ${getBackendUrl()}${endpoint}`);
  
  try {
    const response = await fetch(`${getBackendUrl()}${endpoint}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error for ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorBody
      });
      
      if (response.status === 401) {
        console.warn('Authentication failed for API call:', endpoint);
        // Try to refresh token and retry once
        try {
          const refreshedHeaders = await createAuthHeaders(session);
          if (refreshedHeaders) {
            console.log('Retrying API call with refreshed token:', endpoint);
            const retryResponse = await fetch(`${getBackendUrl()}${endpoint}`, {
              method: 'GET',
              headers: refreshedHeaders
            });
            
            if (retryResponse.ok) {
              return await retryResponse.json();
            }
          }
        } catch (refreshError) {
          console.error('Failed to refresh token for retry:', refreshError);
        }
        return null;
      } else if (response.status === 403) {
        console.warn('Access denied for API call:', endpoint);
        return null;
      } else if (response.status === 404) {
        console.log('Analysis not found for case - may not be processed yet:', endpoint);
        return null;
      } else if (response.status === 406) {
        console.log('Analysis not acceptable - case may not be processed yet:', endpoint);
        return null;
      } else if (response.status === 503) {
        console.warn('Service unavailable - backend might be starting up');
      } else {
        console.warn(`API error for ${endpoint}:`, response.status, response.statusText);
        return null;
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Network error for ${endpoint}:`, error);
    return null;
  }
};

// Case Analysis API Functions
export const fetchCaseProbabilityAnalysis = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/probability`, session));
};

export const fetchCaseRiskAssessment = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/risk-assessment`, session));
};

export const fetchCasePrecedents = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/precedents`, session));
};

export const fetchJudgeAnalysis = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/judge-trends`, session));
};

export const fetchSettlementAnalysis = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/settlement-analysis`, session));
};

export const fetchFinancialPrediction = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/financial-prediction`, session));
};

export const fetchTimelineEstimate = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/timeline-estimate`, session));
};

export const fetchCostEstimate = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAPICall(`/api/cases/${caseId}/cost-estimate`, session));
};

// Comprehensive case analysis fetch
export const fetchCompleteAnalysis = async (caseId: string, session: any) => {
  try {
    const [
      probability,
      riskAssessment,
      precedents,
      judgeAnalysis,
      settlementAnalysis,
      financialPrediction,
      timelineEstimate,
      costEstimate
    ] = await Promise.allSettled([
      fetchCaseProbabilityAnalysis(caseId, session),
      fetchCaseRiskAssessment(caseId, session),
      fetchCasePrecedents(caseId, session),
      fetchJudgeAnalysis(caseId, session),
      fetchSettlementAnalysis(caseId, session),
      fetchFinancialPrediction(caseId, session),
      fetchTimelineEstimate(caseId, session),
      fetchCostEstimate(caseId, session)
    ]);

    return {
      probability: probability.status === 'fulfilled' ? probability.value : null,
      riskAssessment: riskAssessment.status === 'fulfilled' ? riskAssessment.value : null,
      precedents: precedents.status === 'fulfilled' ? precedents.value : null,
      judgeAnalysis: judgeAnalysis.status === 'fulfilled' ? judgeAnalysis.value : null,
      settlementAnalysis: settlementAnalysis.status === 'fulfilled' ? settlementAnalysis.value : null,
      financialPrediction: financialPrediction.status === 'fulfilled' ? financialPrediction.value : null,
      timelineEstimate: timelineEstimate.status === 'fulfilled' ? timelineEstimate.value : null,
      costEstimate: costEstimate.status === 'fulfilled' ? costEstimate.value : null,
      errors: [] // No errors since we return null instead of throwing
    };
  } catch (error) {
    console.warn('Error fetching complete analysis:', error);
    return {
      probability: null,
      riskAssessment: null,
      precedents: null,
      judgeAnalysis: null,
      settlementAnalysis: null,
      financialPrediction: null,
      timelineEstimate: null,
      costEstimate: null,
      errors: [{ type: 'general', error }]
    };
  }
}; 