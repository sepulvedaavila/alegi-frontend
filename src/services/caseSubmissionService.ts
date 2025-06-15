
import { CaseFormValues } from '@/hooks/useCaseForm';
import { submitCaseToSupabase } from '@/utils/case';
import { toast } from 'sonner';
import { SubmitCaseResult } from '@/utils/case/types';

export const submitCaseForm = async (
  data: CaseFormValues,
  resetForm: () => void,
  setCurrentStep: (step: number) => void,
  setIsSubmitting: (isSubmitting: boolean) => void,
  navigate: (path: string) => void
) => {
  try {
    console.log('Submitting case form data:', data);
    
    const result = await submitCaseToSupabase(data);
    console.log('Case submission result:', result);
    
    if (result.success) {
      // Show success toast
      toast.success('Case brief submitted successfully!', {
        description: result.message || 'Your case has been saved to the database.',
        duration: 5000,
      });
      
      // Check if there were any partial errors (e.g. some files failed to upload)
      if (result.error) {
        toast.warning('Some information may be incomplete', {
          description: result.error,
          duration: 8000,
        });
      }
      
      // Reset the form and redirect to dashboard
      resetForm();
      setCurrentStep(1);
      navigate('/dashboard');
    } else {
      // Show error toast with specific error message
      toast.error(`Failed to submit case brief: ${result.error || 'Unknown error'}`, {
        duration: 8000,
      });
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
