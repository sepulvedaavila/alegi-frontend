import { supabase } from '@/integrations/supabase/client';

// Direct Supabase queries for case data
export const fetchCasePredictions = async (caseId: string) => {
  try {
    const { data, error } = await supabase
      .from('case_predictions')
      .select('*')
      .eq('case_id', caseId)
      .maybeSingle();

    if (error) {
      // Check for specific error codes
      if (error.code === 'PGRST116') {
        console.log('No predictions found for case - case might not be processed yet');
        return null;
      }
      if (error.code === '42P01') {
        console.error('Table case_predictions does not exist');
        return null;
      }
      if (error.message?.includes('406') || error.message?.includes('Not Acceptable')) {
        console.log('Schema mismatch or access issue for case_predictions');
        return null;
      }
      
      console.warn('Unexpected error fetching case predictions:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception in fetchCasePredictions:', error);
    return null;
  }
};

export const fetchCaseAIEnrichment = async (caseId: string) => {
  try {
    const { data, error } = await supabase
      .from('case_ai_enrichment')
      .select('*')
      .eq('case_id', caseId)
      .maybeSingle();

    if (error) {
      // Log the specific error for debugging
      console.warn('Error fetching AI enrichment:', error);
      
      // If it's a 406 error, table doesn't exist, or no rows, return null gracefully
      if (error.code === 'PGRST116' || error.code === '42P01' || error.message?.includes('406') || error.message?.includes('Not Acceptable')) {
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
    // Try precedent_cases table
    const { data, error } = await supabase
      .from('precedent_cases')
      .select('*')
      .eq('case_id', caseId)
      .order('similarity_score', { ascending: false })
      .limit(10);

    if (error) {
      console.warn('Error fetching similar cases:', error);
      return [];
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
      console.warn('Error fetching case analysis:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching case analysis:', error);
    return [];
  }
};

// Comprehensive case data fetch with better error handling
export const fetchComprehensiveCaseData = async (caseId: string) => {
  try {
    const [predictions, enrichment, similarCases, analysis] = await Promise.allSettled([
      fetchCasePredictions(caseId),
      fetchCaseAIEnrichment(caseId),
      fetchSimilarCases(caseId),
      fetchCaseAnalysis(caseId)
    ]);

    const errors = [];
    
    // Only add errors for actual failures, not missing data
    if (predictions.status === 'rejected') {
      errors.push({ type: 'predictions', error: predictions.reason });
    }
    if (enrichment.status === 'rejected') {
      errors.push({ type: 'enrichment', error: enrichment.reason });
    }
    if (similarCases.status === 'rejected') {
      errors.push({ type: 'similarCases', error: similarCases.reason });
    }
    if (analysis.status === 'rejected') {
      errors.push({ type: 'analysis', error: analysis.reason });
    }

    return {
      predictions: predictions.status === 'fulfilled' ? predictions.value : null,
      enrichment: enrichment.status === 'fulfilled' ? enrichment.value : null,
      similarCases: similarCases.status === 'fulfilled' ? similarCases.value : [],
      analysis: analysis.status === 'fulfilled' ? analysis.value : [],
      errors
    };
  } catch (error) {
    console.error('Error fetching comprehensive case data:', error);
    return {
      predictions: null,
      enrichment: null,
      similarCases: [],
      analysis: [],
      errors: [{ type: 'general', error }]
    };
  }
}; 