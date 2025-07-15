import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  FileText, 
  Users, 
  Scale, 
  Upload,
  CheckCircle,
  AlertTriangle,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Import existing form sections
import CaseIdentifiersForm from './form-sections/CaseIdentifiersForm';
import CaseDetailsForm from './form-sections/CaseDetailsForm';
import EvidenceForm from './form-sections/EvidenceForm';

// Import hooks and utilities
import { useCaseForm, CaseFormValues } from '@/hooks/useCaseForm';
import { submitCaseForm } from '@/services/caseSubmissionService';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';

interface WizardStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isOptional?: boolean;
}

export const CreateCaseWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  const { refreshCases } = useDashboard();
  const { session, user } = useAuth();

  const methods = useCaseForm();
  const { watch, trigger, formState: { errors } } = methods;

  // Define wizard steps
  const steps: WizardStep[] = [
    {
      id: 1,
      title: 'Case Information',
      description: 'Basic case details and identifiers',
      icon: <FileText className="h-5 w-5" />,
      component: <CaseIdentifiersForm />,
    },
    {
      id: 2,
      title: 'Parties & Details',
      description: 'Case narrative and involved parties',
      icon: <Users className="h-5 w-5" />,
      component: <CaseDetailsForm />,
    },
    {
      id: 3,
      title: 'Evidence & Documents',
      description: 'Upload supporting documents and evidence',
      icon: <Upload className="h-5 w-5" />,
      component: <EvidenceForm />,
      isOptional: true,
    },
    {
      id: 4,
      title: 'Review & Submit',
      description: 'Review your case and submit for AI analysis',
      icon: <CheckCircle className="h-5 w-5" />,
      component: <ReviewStep />,
    },
  ];

  const currentStepData = steps.find(s => s.id === currentStep);
  const progress = (currentStep / steps.length) * 100;

  // Validation rules for each step
  const stepValidationFields: Record<number, string[]> = {
    1: ['caseName', 'caseType', 'jurisdiction'],
    2: ['caseNarrative', 'plaintiffs', 'defendants'],
    3: [], // Optional step
    4: [], // Review step
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = stepValidationFields[currentStep];
    if (fieldsToValidate.length === 0) return true;

    const result = await trigger(fieldsToValidate as any);
    return result;
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      const isValid = await validateCurrentStep();
      
      if (isValid) {
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        setCurrentStep(prev => prev + 1);
      } else {
        toast.error('Please fill in all required fields before proceeding');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = async (stepId: number) => {
    if (stepId <= currentStep || completedSteps.has(stepId - 1)) {
      setCurrentStep(stepId);
    }
  };

  const handleSubmit = async (data: CaseFormValues) => {
    setIsSubmitting(true);
    
    try {
      await submitCaseForm(
        data, 
        methods.reset, 
        setCurrentStep, 
        setIsSubmitting, 
        navigate, 
        session
      );
      
      // Refresh cases and show success message
      await refreshCases();
      toast.success('Case created successfully! AI analysis will begin shortly.');
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error submitting case:', error);
      toast.error('Failed to create case. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipOptional = () => {
    if (currentStepData?.isOptional) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Case</h1>
          <p className="text-gray-600">
            Follow these steps to create your case and enable AI-powered legal analysis
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-6" />
          
          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center cursor-pointer transition-colors ${
                  step.id <= currentStep || completedSteps.has(step.id)
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
                onClick={() => handleStepClick(step.id)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 transition-colors ${
                    completedSteps.has(step.id)
                      ? 'bg-green-600 border-green-600 text-white'
                      : step.id === currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : step.id < currentStep
                      ? 'bg-blue-100 border-blue-600 text-blue-600'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {completedSteps.has(step.id) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{step.title}</p>
                  {step.isOptional && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Optional
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {currentStepData?.icon && (
                      <div className="text-blue-600">{currentStepData.icon}</div>
                    )}
                  </div>
                  <div>
                    <CardTitle>{currentStepData?.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {currentStepData?.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step Content */}
                {currentStepData?.component}

                {/* Error Summary */}
                {Object.keys(errors).length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Please correct the errors above before proceeding.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex space-x-3">
                    {currentStepData?.isOptional && currentStep < steps.length && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleSkipOptional}
                      >
                        Skip for now
                      </Button>
                    )}

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                            Creating Case...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Create Case & Start Analysis
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </FormProvider>

        {/* AI Analysis Notice */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">AI Analysis Information</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Once submitted, your case will undergo comprehensive AI analysis including outcome prediction, 
                  risk assessment, precedent research, and settlement analysis. This process typically takes 5-7 minutes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Review Step Component
const ReviewStep: React.FC = () => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="space-y-6">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Review your case information below. You can go back to edit any section if needed.
        </AlertDescription>
      </Alert>

      {/* Case Information Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium">Case Name:</span>
              <p className="text-sm text-gray-700">{formData.caseName || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Case Type:</span>
              <p className="text-sm text-gray-700">{formData.caseType || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Jurisdiction:</span>
              <p className="text-sm text-gray-700">{formData.jurisdiction || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Case Number:</span>
              <p className="text-sm text-gray-700">{formData.caseNumber || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Parties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm font-medium">Plaintiffs:</span>
              <p className="text-sm text-gray-700">
                {formData.plaintiffs?.length > 0 
                  ? formData.plaintiffs.map(p => p.name).join(', ')
                  : 'None specified'
                }
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">Defendants:</span>
              <p className="text-sm text-gray-700">
                {formData.defendants?.length > 0 
                  ? formData.defendants.map(d => d.name).join(', ')
                  : 'None specified'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Case Narrative */}
      {formData.caseNarrative && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Case Narrative</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {formData.caseNarrative}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Evidence Summary */}
      {formData.evidence?.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Evidence & Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {formData.evidence.length} evidence item(s) attached
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateCaseWizard;