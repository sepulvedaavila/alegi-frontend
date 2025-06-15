
import { supabase } from '@/integrations/supabase/client';
import { uploadFileToStorage } from './fileUploadUtils';

/**
 * Processes and uploads supporting documents for a case
 * @param documents The supporting documents to process
 * @param caseId The ID of the case
 * @returns Object with success status and array of errors if any
 */
export const processSupportingDocuments = async (
  documents: (File | undefined)[],
  caseId: string
): Promise<{ success: boolean; errors: string[] }> => {
  const errors: string[] = [];
  
  try {
    if (!documents || documents.length === 0) {
      return { success: true, errors: [] };
    }
    
    const validDocs = documents.filter((doc): doc is File => !!doc);
    
    if (validDocs.length === 0) {
      return { success: true, errors: [] };
    }
    
    console.log(`Processing ${validDocs.length} documents`);
    const documentsToInsert = [];
    
    for (const file of validDocs) {
      const uploadResult = await uploadFileToStorage(file, 'documents', caseId);
      
      if (uploadResult.success && uploadResult.fileUrl) {
        documentsToInsert.push({
          case_id: caseId,
          file_name: file.name,
          file_type: file.type,
          file_path: uploadResult.fileUrl,
          file_size: file.size
        });
      } else {
        errors.push(`Failed to upload document ${file.name}: ${uploadResult.error || 'Unknown error'}`);
      }
    }
    
    if (documentsToInsert.length > 0) {
      console.log(`Inserting ${documentsToInsert.length} document records`);
      const { error: docsError } = await supabase
        .from('case_documents')
        .insert(documentsToInsert);
      
      if (docsError) {
        console.error('Error inserting documents:', docsError);
        errors.push(`Documents: ${docsError.message}`);
      }
    }
    
    return { 
      success: errors.length === 0,
      errors 
    };
  } catch (error) {
    console.error('Error processing documents:', error);
    errors.push(`Document processing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, errors };
  }
};
