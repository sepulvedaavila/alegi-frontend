import { CaseFormValues } from '@/hooks/useCaseForm';
import { submitCaseToSupabase } from '@/utils/case';
import { toast } from 'sonner';
import { SubmitCaseResult } from '@/utils/case/types';

export const submitCaseForm = async (
  data: CaseFormValues,
  resetForm: () => void,
  setCurrentStep: (step: number) => void,
  setIsSubmitting: (isSubmitting: boolean) => void,
  navigate?: (path: string) => void,
  session?: any
) => {
  try {
    console.log('Submitting case form data:', data);
    
    // Submit case brief to Supabase only
    const supabaseResult = await submitCaseToSupabase(data);
    console.log('Supabase case submission result:', supabaseResult);
    
    if (!supabaseResult.success) {
      toast.error(`Failed to submit case brief: ${supabaseResult.error || 'Unknown error'}`, {
        duration: 8000,
      });
      return;
    }

    // Show success toast
    toast.success('Case brief submitted successfully!', {
      description: 'Your case has been saved to the database.',
      duration: 5000,
    });
    
    // Check if there were any partial errors from Supabase
    if (supabaseResult.error) {
      toast.warning('Some information may be incomplete', {
        description: supabaseResult.error,
        duration: 8000,
      });
    }
    
    // Reset the form
    resetForm();
    setCurrentStep(1);
    
    // Only navigate if navigate function is provided
    if (navigate) {
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Failed to submit case brief. Please try again.', {
      description: error instanceof Error ? error.message : 'Unknown error occurred',
      duration: 8000,
    });
  } finally {
    setIsSubmitting(false);
  }
};

export const getSubmissionStatus = async (caseId: string): Promise<SubmitCaseResult> => {
  try {
    // You could fetch the status of a submission from the server
    // For now we'll just return success since we assume it was successful
    return {
      success: true,
      caseId: caseId
    };
  } catch (error) {
    console.error('Error getting submission status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
