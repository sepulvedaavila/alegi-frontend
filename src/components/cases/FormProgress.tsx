
import { cn } from '@/lib/utils';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress = ({ currentStep, totalSteps }: FormProgressProps) => {
  const stepTitles = [
    'Case Identifiers',
    'Case Details',
    'Evidence & Notes'
  ];

  return (
    <div className="mb-8">
      <div className="hidden sm:flex justify-between mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center w-full">
              <div className="relative flex items-center justify-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors",
                  isActive ? "border-alegi-blue bg-alegi-blue text-white" : 
                  isCompleted ? "border-alegi-blue bg-alegi-blue text-white" : 
                  "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                )}>
                  {isCompleted ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : null}
                </div>
                
                {step < totalSteps && (
                  <div className={cn(
                    "absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2 transition-colors",
                    isCompleted ? "bg-alegi-blue" : "bg-gray-300 dark:bg-gray-600"
                  )} style={{ width: "calc(100% - 2.5rem)", marginLeft: "1.25rem" }} />
                )}
              </div>
              <span className={cn(
                "mt-2 text-xs font-medium transition-colors",
                isActive ? "text-alegi-blue" : 
                isCompleted ? "text-alegi-blue" : 
                "text-gray-500 dark:text-gray-400"
              )}>
                {stepTitles[index]}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile progress indicator */}
      <div className="sm:hidden mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-alegi-blue">
            {stepTitles[currentStep - 1]}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-alegi-blue h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormProgress;
