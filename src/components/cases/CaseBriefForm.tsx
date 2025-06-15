import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { ChevronRight, ChevronLeft, Send, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CaseIdentifiersForm from './form-sections/CaseIdentifiersForm';
import CaseDetailsForm from './form-sections/CaseDetailsForm';
import EvidenceForm from './form-sections/EvidenceForm';
import FormProgress from './FormProgress';
import { useCaseForm, CaseFormValues } from '@/hooks/useCaseForm';
import { handleNextStep, handlePrevStep } from '@/utils/formStepUtils';
import { submitCaseForm } from '@/services/caseSubmissionService';

// Re-export the CaseFormValues type for use in other files
export type { CaseFormValues };

const CaseBriefForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const methods = useCaseForm();

  const onSubmit = async (data: CaseFormValues) => {
    await submitCaseForm(data, methods.reset, setCurrentStep, setIsSubmitting, navigate);
  };

  const nextStep = async () => {
    await handleNextStep(methods, currentStep, setCurrentStep, totalSteps);
  };

  const prevStep = () => {
    handlePrevStep(setCurrentStep);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CaseIdentifiersForm />;
      case 2:
        return <CaseDetailsForm />;
      case 3:
        return <EvidenceForm />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Case Brief</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
              )}
              
              <div className="ml-auto flex space-x-3">
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Case Brief'}
                    <Send size={16} />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      
      <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-start gap-3">
        <Lightbulb className="text-blue-500 flex-shrink-0 mt-1" size={20} />
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> Be as detailed as possible when describing the case facts and legal issues. This information will be used by our AI to generate predictions and insights about your case.
        </p>
      </div>
    </div>
  );
};

export default CaseBriefForm;
