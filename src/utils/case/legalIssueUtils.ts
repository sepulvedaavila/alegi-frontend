
import { supabase } from '@/integrations/supabase/client';

/**
 * Processes and inserts legal issues for a case
 * @param legalIssues The legal issues to process
 * @param caseId The ID of the case
 * @returns Object with success status and error message if applicable
 */
export const processLegalIssues = async (
  legalIssues: string[],
  caseId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!legalIssues || legalIssues.length === 0) {
      return { success: true };
    }
    
    const validIssues = legalIssues
      .filter(issue => issue && issue.trim() !== '')
      .map(issue => ({
        case_id: caseId,
        issue: issue.trim()
      }));
    
    if (validIssues.length === 0) {
      return { success: true };
    }
    
    console.log(`Inserting ${validIssues.length} legal issues`);
    const { error: issuesError } = await supabase
      .from('case_legal_issues')
      .insert(validIssues);
    
    if (issuesError) {
      console.error('Error inserting legal issues:', issuesError);
      return { success: false, error: issuesError.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing legal issues:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error processing legal issues' 
    };
  }
};
