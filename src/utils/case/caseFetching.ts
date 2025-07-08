import { supabase } from '@/integrations/supabase/client';
import { CompleteCase } from './types';
import { Case } from '@/types/dashboard';

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
      .maybeSingle();
    
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

/**
 * Fetches all cases for a specific user
 * @param userId The ID of the user whose cases to fetch
 * @returns Array of cases for the user
 */
export const fetchUserCases = async (userId: string): Promise<Case[]> => {
  try {
    console.log('Fetching cases for user:', userId);
    
    const { data: casesData, error } = await supabase
      .from('case_briefs')
      .select(`
        id,
        case_name,
        case_stage,
        case_type,
        case_number,
        jurisdiction,
        date_filed,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user cases:', error);
      return [];
    }

    if (!casesData) {
      console.log('No cases found for user:', userId);
      return [];
    }

    console.log(`Found ${casesData.length} cases for user:`, userId);

    // Transform the database data to match the Case type used in the dashboard
    const transformedCases: Case[] = casesData.map(caseData => {
      // Determine status based on case_stage
      let status: 'Active' | 'Pending' | 'Closed' = 'Pending';
      if (caseData.case_stage === 'Filed' || caseData.case_stage === 'Discovery' || caseData.case_stage === 'Trial') {
        status = 'Active';
      } else if (caseData.case_stage === 'Settled' || caseData.case_stage === 'Dismissed' || caseData.case_stage === 'Closed') {
        status = 'Closed';
      }

      // Calculate a stable confidence score based on case data
      const getStableConfidence = () => {
        let baseConfidence = 65; // Default base confidence
        
        // Adjust based on case stage
        switch (caseData.case_stage) {
          case 'Settled':
          case 'Closed':
            baseConfidence = 85;
            break;
          case 'Trial':
            baseConfidence = 75;
            break;
          case 'Discovery':
            baseConfidence = 70;
            break;
          case 'Filed':
            baseConfidence = 60;
            break;
          default:
            baseConfidence = 65;
        }
        
        // Adjust based on case type
        switch (caseData.case_type) {
          case 'Contract Dispute':
            baseConfidence += 10;
            break;
          case 'Employment':
            baseConfidence += 5;
            break;
          case 'Medical Malpractice':
          case 'Product Liability':
            baseConfidence -= 10;
            break;
          case 'Personal Injury':
            baseConfidence -= 5;
            break;
        }
        
        // Ensure confidence is within reasonable bounds
        return Math.max(30, Math.min(95, baseConfidence));
      };

      // Determine risk level based on case type and other factors
      let risk: 'Low' | 'Medium' | 'High' = 'Medium';
      if (caseData.case_type === 'Medical Malpractice' || caseData.case_type === 'Product Liability') {
        risk = 'High';
      } else if (caseData.case_type === 'Contract Dispute' || caseData.case_type === 'Employment') {
        risk = 'Low';
      }

      const transformedCase = {
        id: caseData.id,
        title: caseData.case_name || `Case ${caseData.case_number || caseData.id}`,
        status,
        confidence: getStableConfidence(),
        date: caseData.date_filed || caseData.created_at.split('T')[0],
        risk
      };

      console.log('Transformed case:', transformedCase);
      return transformedCase;
    });

    return transformedCases;
  } catch (error) {
    console.error('Error fetching user cases:', error);
    return [];
  }
};
