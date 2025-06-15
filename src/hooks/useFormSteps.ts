
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface FormStepValidation {
  step: number;
  fields: string[];
}

interface UseFormStepsProps<T> {
  form: UseFormReturn<T>;
  steps: FormStepValidation[];
  totalSteps: number;
  onComplete?: (data: T) => Promise<void> | void;
  submitOnMount?: boolean;
}

export function useFormSteps<T>({ 
  form, 
  steps, 
  totalSteps,
  onComplete,
  submitOnMount = false
}: UseFormStepsProps<T>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { trigger, handleSubmit } = form;
  
  const getFieldsToValidate = (step: number): string[] => {
    const stepConfig = steps.find(s => s.step === step);
    return stepConfig?.fields || [];
  };

  const checkPageValidity = async (step: number) => {
    const fieldsToValidate = getFieldsToValidate(step);
    return await trigger(fieldsToValidate as any);
  };

  const handleNextStep = async () => {
    const isPageValid = await checkPageValidity(currentStep);
    if (isPageValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (data: T) => {
    // Only validate and submit when explicitly triggered
    if (!submitOnMount) {
      // Validate final step before submission
      const isPageValid = await checkPageValidity(currentStep);
      if (!isPageValid) return;
      
      setIsSubmitting(true);
      try {
        if (onComplete) {
          await onComplete(data);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const submitHandler = handleSubmit(handleFormSubmit);

  return {
    currentStep,
    totalSteps,
    isSubmitting,
    handleNextStep,
    handlePrevStep,
    submitHandler,
    setCurrentStep,
    setIsSubmitting,
  };
}
