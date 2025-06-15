
import { supabase } from '@/integrations/supabase/client';
import { EvidenceItem, FormEvidenceItem } from './types';
import { uploadFileToStorage } from './fileUploadUtils';

/**
 * Processes and uploads evidence items for a case
 * @param evidenceItems The evidence items to process
 * @param caseId The ID of the case
 * @returns Object with success status and array of errors if any
 */
export const processEvidenceItems = async (
  evidenceItems: FormEvidenceItem[],
  caseId: string
): Promise<{ success: boolean; errors: string[] }> => {
  const errors: string[] = [];
  
  try {
    if (!evidenceItems || evidenceItems.length === 0) {
      return { success: true, errors: [] };
    }
    
    const validEvidence = evidenceItems
      .filter(e => e.type && e.description)
      .map(e => ({
        case_id: caseId,
        type: e.type!,
        description: e.description!,
        file_path: null // Will update this if file upload is successful
      }));
    
    // Handle file uploads for evidence
    if (validEvidence.length > 0) {
      for (let i = 0; i < validEvidence.length; i++) {
        const evidenceItem = evidenceItems[i];
        if (evidenceItem.file) {
          const uploadResult = await uploadFileToStorage(evidenceItem.file, 'evidence', caseId);
          
          if (uploadResult.success && uploadResult.fileUrl) {
            validEvidence[i].file_path = uploadResult.fileUrl;
          }
        }
      }
      
      console.log(`Inserting ${validEvidence.length} evidence records`);
      const { error: evidenceError } = await supabase
        .from('case_evidence')
        .insert(validEvidence);
      
      if (evidenceError) {
        console.error('Error inserting evidence:', evidenceError);
        errors.push(`Evidence: ${evidenceError.message}`);
      }
    }
    
    return { 
      success: errors.length === 0,
      errors 
    };
  } catch (error) {
    console.error('Error processing evidence:', error);
    errors.push(`Evidence processing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, errors };
  }
};
