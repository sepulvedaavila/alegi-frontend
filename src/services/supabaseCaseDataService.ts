import { supabase } from '@/integrations/supabase/client';

// Direct Supabase queries for case data
export const fetchCasePredictions = async (caseId: string) => {
  try {
    const { data, error } = await supabase
      .from('case_predictions')
      .select('*')
      .eq('case_id', caseId)
      .single();

    if (error) {
      // Log the specific error for debugging
      console.warn('Error fetching case predictions:', error);
      
      // If it's a no rows error, return null gracefully
      if (error.code === 'PGRST116') {
        console.log('No predictions found for case');
        return null;
      }
      
      // For other errors, still return null but log the error
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching case predictions:', error);
    return null;
  }
};

export const fetchCaseAIEnrichment = async (caseId: string) => {
  try {
    const { data, error } = await supabase
      .from('case_ai_enrichment')
      .select('*')
      .eq('case_id', caseId)
      .single();

    if (error) {
      // Log the specific error for debugging
      console.warn('Error fetching AI enrichment:', error);
      
      // If it's a 406 error or table doesn't exist, return null gracefully
      if (error.code === 'PGRST116' || error.message?.includes('406') || error.message?.includes('Not Acceptable')) {
        console.log('AI enrichment table not available or case not processed yet');
        return null;
      }
      
      // For other errors, still return null but log the error
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching AI enrichment:', error);
    return null;
  }
};

export const fetchSimilarCases = async (caseId: string) => {
  try {
    // Use precedent_cases table instead of similar_cases
    const { data, error } = await supabase
      .from('precedent_cases')
      .select('*')
      .eq('case_id', caseId)
      .order('similarity_score', { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching similar cases:', error);
    return [];
  }
};

export const fetchCaseAnalysis = async (caseId: string, analysisType?: string) => {
  try {
    // Use case_predictions table for analysis data
    const { data, error } = await supabase
      .from('case_predictions')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching case analysis:', error);
    return [];
  }
};

// Comprehensive case data fetch
export const fetchComprehensiveCaseData = async (caseId: string) => {
  try {
    const [predictions, enrichment, similarCases, analysis] = await Promise.allSettled([
      fetchCasePredictions(caseId),
      fetchCaseAIEnrichment(caseId),
      fetchSimilarCases(caseId),
      fetchCaseAnalysis(caseId)
    ]);

    return {
      predictions: predictions.status === 'fulfilled' ? predictions.value : null,
      enrichment: enrichment.status === 'fulfilled' ? enrichment.value : null,
      similarCases: similarCases.status === 'fulfilled' ? similarCases.value : [],
      analysis: analysis.status === 'fulfilled' ? analysis.value : [],
      errors: [
        predictions.status === 'rejected' ? { type: 'predictions', error: predictions.reason } : null,
        enrichment.status === 'rejected' ? { type: 'enrichment', error: enrichment.reason } : null,
        similarCases.status === 'rejected' ? { type: 'similarCases', error: similarCases.reason } : null,
        analysis.status === 'rejected' ? { type: 'analysis', error: analysis.reason } : null
      ].filter(Boolean)
    };
  } catch (error) {
    console.error('Error fetching comprehensive case data:', error);
    throw error;
  }
}; 