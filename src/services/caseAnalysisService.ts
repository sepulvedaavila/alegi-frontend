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
    throw new Error('No authentication token available');
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
        throw new Error('Authentication failed');
      } else if (response.status === 403) {
        console.warn('Access denied for API call:', endpoint);
        throw new Error('Access denied');
      } else if (response.status === 404) {
        console.log('Analysis not found for case - may not be processed yet:', endpoint);
        throw new Error('Analysis not found - case may not be processed yet');
      } else if (response.status === 406) {
        console.log('Analysis not acceptable - case may not be processed yet:', endpoint);
        throw new Error('Analysis not acceptable - case may not be processed yet');
      } else {
        console.error(`API error for ${endpoint}:`, response.status, response.statusText);
        throw new Error(`API error: ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    // Handle network errors (CORS, connection issues, etc.)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.warn('Network error for API call:', endpoint, error.message);
      throw new Error('Network error - unable to reach analysis service');
    }
    
    // Re-throw other errors
    throw error;
  }
};

// Case Analysis API Functions
export const fetchCaseProbabilityAnalysis = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/probability`, session);
  } catch (error) {
    console.error('Error fetching probability analysis:', error);
    throw error;
  }
};

export const fetchCaseRiskAssessment = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/risk-assessment`, session);
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    throw error;
  }
};

export const fetchCasePrecedents = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/precedents`, session);
  } catch (error) {
    console.error('Error fetching precedents:', error);
    throw error;
  }
};

export const fetchJudgeAnalysis = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/judge-trends`, session);
  } catch (error) {
    console.error('Error fetching judge analysis:', error);
    throw error;
  }
};

export const fetchSettlementAnalysis = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/settlement-analysis`, session);
  } catch (error) {
    console.error('Error fetching settlement analysis:', error);
    throw error;
  }
};

export const fetchFinancialPrediction = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/financial-prediction`, session);
  } catch (error) {
    console.error('Error fetching financial prediction:', error);
    throw error;
  }
};

export const fetchTimelineEstimate = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/timeline-estimate`, session);
  } catch (error) {
    console.error('Error fetching timeline estimate:', error);
    throw error;
  }
};

export const fetchCostEstimate = async (caseId: string, session: any) => {
  try {
    return await makeAPICall(`/api/cases/${caseId}/cost-estimate`, session);
  } catch (error) {
    console.error('Error fetching cost estimate:', error);
    throw error;
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
      errors: [
        probability.status === 'rejected' ? { type: 'probability', error: probability.reason } : null,
        riskAssessment.status === 'rejected' ? { type: 'riskAssessment', error: riskAssessment.reason } : null,
        precedents.status === 'rejected' ? { type: 'precedents', error: precedents.reason } : null,
        judgeAnalysis.status === 'rejected' ? { type: 'judgeAnalysis', error: judgeAnalysis.reason } : null,
        settlementAnalysis.status === 'rejected' ? { type: 'settlementAnalysis', error: settlementAnalysis.reason } : null,
        financialPrediction.status === 'rejected' ? { type: 'financialPrediction', error: financialPrediction.reason } : null,
        timelineEstimate.status === 'rejected' ? { type: 'timelineEstimate', error: timelineEstimate.reason } : null,
        costEstimate.status === 'rejected' ? { type: 'costEstimate', error: costEstimate.reason } : null
      ].filter(Boolean)
    };
  } catch (error) {
    console.error('Error fetching complete analysis:', error);
    throw error;
  }
}; 