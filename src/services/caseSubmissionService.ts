import { CaseFormValues } from '@/hooks/useCaseForm';
import { submitCaseToSupabase } from '@/utils/case';
import { submitCaseIntake, uploadCaseDocument, triggerCaseAnalysis } from './alegiApiService';
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
    
    // Step 1: Submit case brief to Supabase (as per requirements)
    const supabaseResult = await submitCaseToSupabase(data);
    console.log('Supabase case submission result:', supabaseResult);
    
    if (!supabaseResult.success) {
      toast.error(`Failed to submit case brief: ${supabaseResult.error || 'Unknown error'}`, {
        duration: 8000,
      });
      return;
    }

    // Step 2: Submit case intake to backend API for processing
    if (session && supabaseResult.caseId) {
      try {
        // Prepare case data for backend intake
        const caseIntakeData = {
          case_name: data.caseName || '',
          case_description: data.caseNarrative || '',
          case_type: data.caseType || null,
          jurisdiction: data.stateJurisdiction 
            ? (data.countyJurisdiction 
                ? `${data.stateJurisdiction} - ${data.countyJurisdiction}` 
                : data.stateJurisdiction) 
            : null,
          case_stage: data.caseStage,
          case_number: data.caseNumber || null,
          date_filed: data.caseStage === 'Assessing filing' ? 
            null : 
            data.dateFiled ? data.dateFiled.toISOString() : new Date().toISOString(),
          // Include additional metadata
          metadata: {
            history_narrative: data.historyNarrative || null,
            applicable_law: data.applicableLaw || null,
            expected_outcome: data.expectedOutcome || null,
            additional_notes: data.additional_notes || null,
            plaintiffs: data.plaintiffs || [],
            defendants: data.defendants || [],
            attorneys_of_record: data.attorneysOfRecord || [],
            legal_issues: data.legalIssues || [],
            evidence: data.evidence || [],
            supporting_documents: data.supportingDocuments || []
          }
        };

        console.log('Submitting case intake to backend:', caseIntakeData);
        const backendResult = await submitCaseIntake(caseIntakeData, session);
        console.log('Backend case intake result:', backendResult);

        // Step 3: Upload supporting documents if any
        if (data.supportingDocuments && data.supportingDocuments.length > 0 && backendResult.caseId) {
          const uploadPromises = data.supportingDocuments
            .filter((file): file is File => !!file)
            .map(file => uploadCaseDocument(backendResult.caseId, file, session));
          
          try {
            await Promise.all(uploadPromises);
            console.log('All documents uploaded successfully');
          } catch (uploadError) {
            console.error('Some documents failed to upload:', uploadError);
            toast.warning('Some documents failed to upload to processing system', {
              description: 'Your case brief was saved, but some documents may not be processed.',
              duration: 8000,
            });
          }
        }

        // Step 4: Trigger analysis
        if (backendResult.caseId) {
          try {
            await triggerCaseAnalysis(backendResult.caseId, session);
            console.log('Analysis triggered successfully');
          } catch (analysisError) {
            console.error('Failed to trigger analysis:', analysisError);
            toast.warning('Analysis trigger failed', {
              description: 'Your case was submitted but analysis may be delayed.',
              duration: 8000,
            });
          }
        }

        // Show success toast with processing notification
        toast.success('Case brief submitted successfully!', {
          description: 'Your case has been saved and is now being processed by AI.',
          duration: 5000,
        });
        
        // Show additional toast about real-time updates
        toast.info('Real-time updates enabled', {
          description: 'You will receive notifications as your case is processed.',
          duration: 4000,
        });

      } catch (backendError) {
        console.error('Backend submission error:', backendError);
        // Show warning but don't fail the entire submission since Supabase succeeded
        toast.warning('Case saved but processing may be delayed', {
          description: 'Your case brief was saved successfully, but there was an issue with the processing system.',
          duration: 8000,
        });
      }
    } else {
      // Fallback if no session or case ID
      toast.success('Case brief submitted successfully!', {
        description: 'Your case has been saved.',
        duration: 5000,
      });
    }
    
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
