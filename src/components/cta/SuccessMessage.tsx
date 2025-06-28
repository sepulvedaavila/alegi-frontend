
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  showCalendly: boolean;
  resetForm: () => void;
}

const SuccessMessage = ({ showCalendly, resetForm }: SuccessMessageProps) => {
  return (
    <div className="text-center py-8">
      {showCalendly ? (
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-6">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            You've been added to our waitlist. Schedule a call with our team below:
          </p>
          
          <div 
            className="calendly-inline-widget w-full" 
            data-url={import.meta.env.VITE_CALENDLY_URL} 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
          
          <button
            onClick={resetForm}
            className="btn-primary mt-4"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-6">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-8">
            We've received your application for the ALEGI beta. We'll be in contact shortly to provide you with free platform access.
          </p>
          <button
            onClick={resetForm}
            className="btn-primary"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;
