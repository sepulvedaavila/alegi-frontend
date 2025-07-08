import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';
import FormProgress from './FormProgress';
import { useCaseForm, CaseFormValues } from '@/hooks/useCaseForm';
import { submitCaseForm } from '@/services/caseSubmissionService';
import { useNavigate } from 'react-router-dom';
import PlaintiffDefendantForm from './form-pages/PlaintiffDefendantForm';
import CaseNarrativeForm from './form-pages/CaseNarrativeForm';
import EvidenceNotesForm from './form-pages/EvidenceNotesForm';
import SecurityNotice from './form-sections/SecurityNotice';
import { useFormSteps, FormStepValidation } from '@/hooks/useFormSteps';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCaseModal = ({ isOpen, onClose }: NewCaseModalProps) => {
  const navigate = useNavigate();
  const methods = useCaseForm();
  const { refreshCases } = useDashboard();
  const { session } = useAuth();
  
  const formSteps: FormStepValidation[] = [
    {
      step: 1,
      fields: ['plaintiffs', 'defendants', 'stateJurisdiction', 'countyJurisdiction']
    },
    {
      step: 2,
      fields: ['caseNarrative', 'expectedOutcome']
    },
    {
      step: 3,
      fields: ['evidence.0.description', 'additionalNotes']
    }
  ];
  
  const totalSteps = formSteps.length;
  
  const handleFormComplete = async (data: CaseFormValues) => {
    await submitCaseForm(data, methods.reset, setCurrentStep, setIsSubmitting, undefined, session);
    await refreshCases();
    onClose();
  };
  
  const { 
    currentStep,
    isSubmitting,
    handleNextStep, 
    handlePrevStep,
    submitHandler,
    setCurrentStep,
    setIsSubmitting
  } = useFormSteps({
    form: methods,
    steps: formSteps,
    totalSteps,
    onComplete: handleFormComplete,
    submitOnMount: false
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PlaintiffDefendantForm />;
      case 2:
        return <CaseNarrativeForm />;
      case 3:
        return <EvidenceNotesForm />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-2xl w-[95%] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl 
        bg-white dark:bg-gray-900 border-none 
        animate-in fade-in-90 slide-in-from-bottom-10
        focus:outline-none
        scrollbar-hide"
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
            New Case Filing
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
            Complete the form below to submit your case for AI analysis
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 px-4 md:px-6">
          <SecurityNotice />
          
          <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
          
          <FormProvider {...methods}>
            <form onSubmit={submitHandler} className="space-y-6">
              {renderStepContent()}
              
              <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto flex space-x-3">
                  {currentStep < totalSteps ? (
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-alegi-blue hover:bg-blue-700 text-white"
                    >
                      Next
                      <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Case'}
                      <Send size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseModal;
