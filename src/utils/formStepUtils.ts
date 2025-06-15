
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { CaseFormValues } from '@/hooks/useCaseForm';

export const getFieldsToValidate = (step: number) => {
  switch (step) {
    case 1:
      return ['caseStage', 'stateJurisdiction', 'plaintiffs', 'defendants'];
    case 2:
      return ['caseNarrative', 'legalIssues'];
    case 3:
      return ['evidence.0.type', 'evidence.0.description'];
    default:
      return [];
  }
};

export const handleNextStep = async (
  methods: UseFormReturn<CaseFormValues>,
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  totalSteps: number
) => {
  const fieldsToValidate = getFieldsToValidate(currentStep);
  
  const result = await methods.trigger(fieldsToValidate as any);
  if (result) {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo(0, 0);
  } else {
    toast.error('Please fix the errors before proceeding');
  }
};

export const handlePrevStep = (
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
) => {
  setCurrentStep((prev) => Math.max(prev - 1, 1));
  window.scrollTo(0, 0);
};
