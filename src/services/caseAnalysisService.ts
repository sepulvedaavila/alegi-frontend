import { useAuth } from '@/contexts/AuthContext';

// Get backend URL from environment or use default
const getBackendUrl = () => {
  return import.meta.env.VITE_BACKEND_URL || 'https://alegi-backend.vercel.app';
};

// Get JWT token from Supabase session
const getJwtToken = (session: any) => {
  return session?.access_token;
};

// Generic API call wrapper with error handling
const makeAPICall = async (endpoint: string, session: any) => {
  const token = getJwtToken(session);
  if (!token) {
    console.warn('No authentication token available for API call');
    return null;
  }

  try {
    const response = await fetch(`${getBackendUrl()}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Authentication failed for API call:', endpoint);
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
      } else {
        console.warn(`API error for ${endpoint}:`, response.status, response.statusText);
        return null;
      }
    }

    return await response.json();
  } catch (error) {
    // Handle network errors (CORS, connection issues, etc.)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.warn('Network error for API call:', endpoint, error.message);
      return null;
    }
    
    // Return null for other errors instead of throwing
    console.warn('Error in API call:', endpoint, error);
    return null;
  }
};

// Case Analysis API Functions
export const fetchCaseProbabilityAnalysis = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/probability`, session);
  } catch (error) {
    console.warn('Error fetching probability analysis:', error);
    return null;
  }
};

export const fetchCaseRiskAssessment = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/risk-assessment`, session);
  } catch (error) {
    console.warn('Error fetching risk assessment:', error);
    return null;
  }
};

export const fetchCasePrecedents = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/precedents`, session);
  } catch (error) {
    console.warn('Error fetching precedents:', error);
    return null;
  }
};

export const fetchJudgeAnalysis = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/judge-trends`, session);
  } catch (error) {
    console.warn('Error fetching judge analysis:', error);
    return null;
  }
};

export const fetchSettlementAnalysis = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/settlement-analysis`, session);
  } catch (error) {
    console.warn('Error fetching settlement analysis:', error);
    return null;
  }
};

export const fetchFinancialPrediction = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/financial-prediction`, session);
  } catch (error) {
    console.warn('Error fetching financial prediction:', error);
    return null;
  }
};

export const fetchTimelineEstimate = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/timeline-estimate`, session);
  } catch (error) {
    console.warn('Error fetching timeline estimate:', error);
    return null;
  }
};

export const fetchCostEstimate = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/cost-estimate`, session);
  } catch (error) {
    console.warn('Error fetching cost estimate:', error);
    return null;
  }
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