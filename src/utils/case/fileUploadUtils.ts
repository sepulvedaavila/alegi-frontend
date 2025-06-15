
import { supabase } from '@/integrations/supabase/client';

/**
 * Uploads a file to Supabase storage
 * @param file The file to upload
 * @param folder The folder to store the file in
 * @param caseId The ID of the case this file belongs to
 * @returns Object with success status and file URL if successful
 */
export const uploadFileToStorage = async (
  file: File,
  folder: string,
  caseId: string
): Promise<{ success: boolean; fileUrl?: string; error?: string }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${caseId}/${fileName}`;
    
    console.log(`Uploading file ${fileName} to ${folder}`);
    
    const { error: uploadError } = await supabase.storage
      .from('case-files')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error(`Error uploading file to ${folder}:`, uploadError);
      return { success: false, error: uploadError.message };
    }
    
    const { data: urlData } = supabase.storage
      .from('case-files')
      .getPublicUrl(filePath);
      
    console.log(`File uploaded successfully: ${urlData.publicUrl}`);
    return { success: true, fileUrl: urlData.publicUrl };
  } catch (error) {
    console.error(`Error processing file upload to ${folder}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during file upload' 
    };
  }
};
