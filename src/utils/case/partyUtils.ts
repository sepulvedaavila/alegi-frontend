
import { supabase } from '@/integrations/supabase/client';
import { Party, FormParty, Attorney, FormAttorney } from './types';

/**
 * Processes and inserts plaintiffs for a case
 * @param plaintiffs The plaintiffs to process
 * @param caseId The ID of the case
 * @returns Object with success status and error message if applicable
 */
export const processPlaintiffs = async (
  plaintiffs: FormParty[],
  caseId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!plaintiffs || plaintiffs.length === 0) {
      return { success: true };
    }
    
    const validPlaintiffs = plaintiffs
      .filter(p => p.name && p.name.trim() !== "")
      .map(p => ({
        case_id: caseId,
        name: p.name!.trim()
      }));
    
    if (validPlaintiffs.length === 0) {
      return { success: true };
    }
    
    console.log(`Inserting ${validPlaintiffs.length} plaintiffs`);
    const { error: plaintiffsError } = await supabase
      .from('case_plaintiffs')
      .insert(validPlaintiffs);
    
    if (plaintiffsError) {
      console.error('Error inserting plaintiffs:', plaintiffsError);
      return { success: false, error: plaintiffsError.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing plaintiffs:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error processing plaintiffs' 
    };
  }
};

/**
 * Processes and inserts defendants for a case
 * @param defendants The defendants to process
 * @param caseId The ID of the case
 * @returns Object with success status and error message if applicable
 */
export const processDefendants = async (
  defendants: FormParty[],
  caseId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!defendants || defendants.length === 0) {
      return { success: true };
    }
    
    const validDefendants = defendants
      .filter(d => d.name && d.name.trim() !== "")
      .map(d => ({
        case_id: caseId,
        name: d.name!.trim()
      }));
    
    if (validDefendants.length === 0) {
      return { success: true };
    }
    
    console.log(`Inserting ${validDefendants.length} defendants`);
    const { error: defendantsError } = await supabase
      .from('case_defendants')
      .insert(validDefendants);
    
    if (defendantsError) {
      console.error('Error inserting defendants:', defendantsError);
      return { success: false, error: defendantsError.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing defendants:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error processing defendants' 
    };
  }
};

/**
 * Processes and inserts attorneys for a case
 * @param attorneys The attorneys to process
 * @param caseId The ID of the case
 * @returns Object with success status and error message if applicable
 */
export const processAttorneys = async (
  attorneys: FormAttorney[],
  caseId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!attorneys || attorneys.length === 0) {
      return { success: true };
    }
    
    const validAttorneys = attorneys
      .filter(a => a.name && a.name.trim() !== "")
      .map(a => ({
        case_id: caseId,
        name: a.name!.trim(),
        bar_id: a.bar_id?.trim() || null
      }));
    
    if (validAttorneys.length === 0) {
      return { success: true };
    }
    
    console.log(`Inserting ${validAttorneys.length} attorneys`);
    const { error: attorneysError } = await supabase
      .from('case_attorneys')
      .insert(validAttorneys);
    
    if (attorneysError) {
      console.error('Error inserting attorneys:', attorneysError);
      return { success: false, error: attorneysError.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing attorneys:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error processing attorneys' 
    };
  }
};
