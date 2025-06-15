
import { supabase } from '@/integrations/supabase/client';
import { CaseFormValues } from '@/hooks/useCaseForm';
import { SubmitCaseResult } from './types';
import { notifyWebhookOfNewCase } from './webhookNotifications';
import { processPlaintiffs, processDefendants, processAttorneys } from './partyUtils';
import { processLegalIssues } from './legalIssueUtils';
import { processEvidenceItems } from './evidenceUtils';
import { processSupportingDocuments } from './documentUtils';

export const submitCaseToSupabase = async (data: CaseFormValues): Promise<SubmitCaseResult> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Prepare dateFiled field based on caseStage
    const dateFiled = data.caseStage === 'Assessing filing' ? 
      null : 
      data.dateFiled ? data.dateFiled.toISOString() : new Date().toISOString();

    // Format jurisdiction by combining state and county
    const jurisdiction = data.stateJurisdiction 
      ? (data.countyJurisdiction 
          ? `${data.stateJurisdiction} - ${data.countyJurisdiction}` 
          : data.stateJurisdiction) 
      : null;

    console.log('Attempting to insert case with user_id:', user.id);

    // Step 1: Insert into case_briefs
    const { data: caseData, error: caseError } = await supabase
      .from('case_briefs')
      .insert({
        user_id: user.id,
        case_name: data.caseName || '',
        case_type: data.caseType || null,
        case_stage: data.caseStage,
        case_number: data.caseNumber || null,
        jurisdiction: jurisdiction,
        date_filed: dateFiled,
        case_narrative: data.caseNarrative,
        history_narrative: data.historyNarrative || null,
        applicable_law: data.applicableLaw || null,
        expected_outcome: data.expectedOutcome || null,
        additional_notes: data.additional_notes || null
      })
      .select('id')
      .single();

    if (caseError) {
      console.error('Error creating case:', caseError);
      return { success: false, error: `Failed to create case: ${caseError.message}` };
    }

    if (!caseData || !caseData.id) {
      console.error('Case data or ID missing after insert');
      return { success: false, error: 'Failed to retrieve case ID after creation' };
    }

    const caseId = caseData.id;
    console.log('Successfully created case with ID:', caseId);
    
    // Track any errors with related data
    let relatedDataErrors: string[] = [];

    // Step 2: Process plaintiffs
    if (data.plaintiffs && data.plaintiffs.length > 0) {
      const plaintiffsResult = await processPlaintiffs(data.plaintiffs, caseId);
      if (!plaintiffsResult.success && plaintiffsResult.error) {
        relatedDataErrors.push(`Plaintiffs: ${plaintiffsResult.error}`);
      }
    }
    
    // Step 3: Process defendants
    if (data.defendants && data.defendants.length > 0) {
      const defendantsResult = await processDefendants(data.defendants, caseId);
      if (!defendantsResult.success && defendantsResult.error) {
        relatedDataErrors.push(`Defendants: ${defendantsResult.error}`);
      }
    }
    
    // Step 4: Process attorneys
    if (data.attorneysOfRecord && data.attorneysOfRecord.length > 0) {
      const attorneysResult = await processAttorneys(data.attorneysOfRecord, caseId);
      if (!attorneysResult.success && attorneysResult.error) {
        relatedDataErrors.push(`Attorneys: ${attorneysResult.error}`);
      }
    }
    
    // Step 5: Process legal issues
    if (data.legalIssues && data.legalIssues.length > 0) {
      const legalIssuesResult = await processLegalIssues(data.legalIssues, caseId);
      if (!legalIssuesResult.success && legalIssuesResult.error) {
        relatedDataErrors.push(`Legal issues: ${legalIssuesResult.error}`);
      }
    }
    
    // Step 6: Process evidence
    if (data.evidence && data.evidence.length > 0) {
      const evidenceResult = await processEvidenceItems(data.evidence, caseId);
      if (!evidenceResult.success) {
        relatedDataErrors.push(...evidenceResult.errors);
      }
    }
    
    // Step 7: Process supporting documents
    if (data.supportingDocuments && data.supportingDocuments.length > 0) {
      const documentsResult = await processSupportingDocuments(data.supportingDocuments, caseId);
      if (!documentsResult.success) {
        relatedDataErrors.push(...documentsResult.errors);
      }
    }
    
    // Notify webhook of new case
    try {
      await notifyWebhookOfNewCase(caseId);
    } catch (webhookError) {
      console.error('Error sending webhook notification:', webhookError);
      // Continue despite webhook error
    }
    
    // Return result with appropriate warnings for any related data issues
    if (relatedDataErrors.length > 0) {
      const errorMessage = `Case created but some related data failed to save: ${relatedDataErrors.join(', ')}`;
      return { 
        success: true, 
        caseId,
        error: errorMessage
      };
    }
    
    return { success: true, caseId };
    
  } catch (error: any) {
    console.error('Error submitting case:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};
