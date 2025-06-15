
import { supabase } from '@/integrations/supabase/client';
import { CompleteCase } from './types';

/**
 * Fetches a complete case with all related data
 * @param caseId The ID of the case to fetch
 * @returns The complete case data or null if not found
 */
export const fetchCompleteCase = async (caseId: string): Promise<CompleteCase | null> => {
  try {
    // Fetch the main case data
    const { data: caseData, error: caseError } = await supabase
      .from('case_briefs')
      .select('*')
      .eq('id', caseId)
      .single();
    
    if (caseError || !caseData) {
      console.error('Error fetching case:', caseError);
      return null;
    }
    
    // Fetch plaintiffs
    const { data: plaintiffsData, error: plaintiffsError } = await supabase
      .from('case_plaintiffs')
      .select('id, name')
      .eq('case_id', caseId);
    
    if (plaintiffsError) {
      console.error('Error fetching plaintiffs:', plaintiffsError);
    }
    
    // Fetch defendants
    const { data: defendantsData, error: defendantsError } = await supabase
      .from('case_defendants')
      .select('id, name')
      .eq('case_id', caseId);
    
    if (defendantsError) {
      console.error('Error fetching defendants:', defendantsError);
    }
    
    // Fetch attorneys
    const { data: attorneysData, error: attorneysError } = await supabase
      .from('case_attorneys')
      .select('id, name, bar_id')
      .eq('case_id', caseId);
    
    if (attorneysError) {
      console.error('Error fetching attorneys:', attorneysError);
    }
    
    // Fetch legal issues
    const { data: issuesData, error: issuesError } = await supabase
      .from('case_legal_issues')
      .select('id, issue')
      .eq('case_id', caseId);
    
    if (issuesError) {
      console.error('Error fetching legal issues:', issuesError);
    }
    
    // Fetch evidence
    const { data: evidenceData, error: evidenceError } = await supabase
      .from('case_evidence')
      .select('id, type, description, file_path')
      .eq('case_id', caseId);
    
    if (evidenceError) {
      console.error('Error fetching evidence:', evidenceError);
    }
    
    // Fetch documents
    const { data: documentsData, error: documentsError } = await supabase
      .from('case_documents')
      .select('id, file_name, file_type, file_path, file_size')
      .eq('case_id', caseId);
    
    if (documentsError) {
      console.error('Error fetching documents:', documentsError);
    }
    
    // Combine all data into the complete case object
    const completeCase: CompleteCase = {
      caseDetails: {
        id: caseData.id,
        case_name: caseData.case_name,
        case_type: caseData.case_type,
        case_stage: caseData.case_stage,
        case_number: caseData.case_number,
        jurisdiction: caseData.jurisdiction || '',
        date_filed: caseData.date_filed || '',
        case_narrative: caseData.case_narrative,
        history_narrative: caseData.history_narrative,
        applicable_law: caseData.applicable_law,
        expected_outcome: caseData.expected_outcome,
        additional_notes: caseData.additional_notes,
        created_at: caseData.created_at,
        updated_at: caseData.updated_at
      },
      plaintiffs: plaintiffsData || [],
      defendants: defendantsData || [],
      attorneys: attorneysData || [],
      legalIssues: issuesData || [],
      evidence: evidenceData || [],
      documents: documentsData || []
    };
    
    return completeCase;
  } catch (error) {
    console.error('Error fetching complete case:', error);
    return null;
  }
};
