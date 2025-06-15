
import { supabase } from "@/integrations/supabase/client";

/**
 * Notifies an external webhook about a new case.
 * This can be used to trigger external workflows or integrations.
 * 
 * @param caseId The ID of the newly created case
 * @returns A promise that resolves when the notification is sent
 */
export const notifyWebhookOfNewCase = async (caseId: string): Promise<void> => {
  try {
    // If you have a webhook URL configured, uncomment and use this code
    // const webhookUrl = import.meta.env.VITE_CASE_WEBHOOK_URL;
    
    // if (!webhookUrl) {
    //   console.warn('No webhook URL configured for case notifications');
    //   return;
    // }
    
    // await fetch(webhookUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     event: 'case.created',
    //     caseId,
    //     timestamp: new Date().toISOString()
    //   }),
    // });
    
    console.log(`Webhook notification would be sent for case ${caseId}`);
    
    // Update the case record with notification status
    const { error } = await supabase
      .from('case_briefs')
      .update({ 
        additional_notes: 'Webhook notification sent at ' + new Date().toISOString() 
      })
      .eq('id', caseId);
      
    if (error) {
      console.error('Error updating case with webhook notification status:', error);
    } else {
      console.log('Case webhook notification sent successfully');
    }
  } catch (error) {
    console.error('Failed to notify webhook:', error);
  }
};
