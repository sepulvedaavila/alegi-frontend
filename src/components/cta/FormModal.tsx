
import { useEffect } from 'react';
import RegistrationForm from './RegistrationForm';
import SuccessMessage from './SuccessMessage';
import { FormData } from './FormTypes';

interface FormModalProps {
  isModalOpen: boolean;
  isSubmitted: boolean;
  showCalendly: boolean;
  formData: FormData;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFullFormSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
  resetForm: () => void;
}

const FormModal = ({
  isModalOpen,
  isSubmitted,
  showCalendly,
  formData,
  isLoading,
  handleInputChange,
  handleFullFormSubmit,
  closeModal,
  resetForm
}: FormModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <RegistrationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFullFormSubmit={handleFullFormSubmit}
            isLoading={isLoading}
            closeModal={closeModal}
          />
        ) : (
          <SuccessMessage 
            showCalendly={showCalendly} 
            resetForm={resetForm} 
          />
        )}
      </div>
    </div>
  );
};

export default FormModal;
