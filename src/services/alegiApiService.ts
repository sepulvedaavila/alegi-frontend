import { useAuth } from '@/contexts/AuthContext';
import { retryWithBackoff } from '@/utils/apiRetry';
import { getValidJWTToken, createAuthHeaders } from '@/utils/auth';

// Get backend URL from environment or use default
const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL || 'https://alegi-backend.vercel.app';
  console.log('Using backend URL:', url);
  return url;
};

// Generic API call wrapper with authentication and error handling
const makeAuthenticatedAPICall = async (endpoint: string, session: any, options: RequestInit = {}) => {
  const headers = await createAuthHeaders(session);
  if (!headers) {
    throw new Error('No authentication token available');
  }

  const response = await fetch(`${getBackendUrl()}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Try to refresh token and retry once
      try {
        const refreshedHeaders = await createAuthHeaders(session);
        if (refreshedHeaders) {
          console.log('Retrying API call with refreshed token:', endpoint);
          const retryResponse = await fetch(`${getBackendUrl()}${endpoint}`, {
            ...options,
            headers: {
              ...refreshedHeaders,
              ...options.headers
            }
          });
          
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        }
      } catch (refreshError) {
        console.error('Failed to refresh token for retry:', refreshError);
      }
      throw new Error('Authentication failed');
    } else if (response.status === 403) {
      throw new Error('Access denied');
    } else if (response.status === 404) {
      throw new Error('Resource not found');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
    }
  }

  return await response.json();
};

// Case Management API Functions
export const submitCaseIntake = async (caseData: any, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall('/api/cases/intake', session, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(caseData)
  }));
};

export const uploadCaseDocument = async (caseId: string, file: File, session: any) => {
  const formData = new FormData();
  formData.append('document', file);

  const headers = await createAuthHeaders(session);
  if (!headers) {
    throw new Error('No authentication token available');
  }

  const response = await fetch(`${getBackendUrl()}/api/cases/${caseId}/documents`, {
    method: 'POST',
    headers: {
      'Authorization': headers.Authorization
    },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText || response.statusText}`);
  }

  return await response.json();
};

export const getCaseStatus = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/status`, session));
};

// New endpoint for basic case data
export const getCaseData = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}`, session));
};

// Comprehensive case view data endpoint - includes all case data without triggering analysis
export const getCaseViewData = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/view`, session));
};

export const getEnhancedCaseStatus = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/enhanced-status`, session));
};

// New endpoint for processing status
export const getCaseProcessingStatus = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/processing-status`, session));
};

// New endpoint for enhanced data
export const getEnhancedCaseData = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/enhanced-data`, session));
};

export const getCaseUpdates = async (caseId: string, lastUpdate: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/updates?lastUpdate=${lastUpdate}`, session));
};

export const getAllUserCasesStatus = async (session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall('/api/cases/status', session));
};

// Analysis API Functions
export const getCaseProbability = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/probability`, session));
};

export const getCaseRiskAssessment = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/risk-assessment`, session));
};

export const getCaseCostEstimate = async (caseId: string, strategy: string = 'standard', session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/cost-estimate?strategy=${strategy}`, session));
};

export const getCaseFinancialPrediction = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/financial-prediction`, session));
};

export const getCaseSettlementAnalysis = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/settlement-analysis`, session));
};

export const getCaseTimelineEstimate = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/timeline-estimate`, session));
};

export const getCasePrecedents = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/precedents`, session));
};

export const getJudgeTrends = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/judge-trends`, session));
};

export const findSimilarCases = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/find-similar`, session));
};

// Manual triggers
export const triggerCaseAnalysis = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/trigger-analysis`, session, {
    method: 'POST'
  }));
};

// New endpoint for enhanced processing
export const triggerEnhancedProcessing = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/enhanced-process`, session, {
    method: 'POST'
  }));
};

export const processCase = async (caseId: string, session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall(`/api/cases/${caseId}/process`, session, {
    method: 'POST'
  }));
};

// System endpoints
export const checkBackendHealth = async () => {
  const response = await fetch(`${getBackendUrl()}/api/health`);
  if (!response.ok) {
    throw new Error(`Backend health check failed: ${response.statusText}`);
  }
  return await response.json();
};

export const getRealtimeStats = async (session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall('/api/realtime/stats', session));
};

export const getOpenAIRateLimits = async (session: any) => {
  return retryWithBackoff(() => makeAuthenticatedAPICall('/api/openai/rate-limits', session));
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
      getCaseProbability(caseId, session),
      getCaseRiskAssessment(caseId, session),
      getCasePrecedents(caseId, session),
      getJudgeTrends(caseId, session),
      getCaseSettlementAnalysis(caseId, session),
      getCaseFinancialPrediction(caseId, session),
      getCaseTimelineEstimate(caseId, session),
      getCaseCostEstimate(caseId, 'standard', session)
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
      errors: []
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