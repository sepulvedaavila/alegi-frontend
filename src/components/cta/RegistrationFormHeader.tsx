
import React from 'react';
import { X } from 'lucide-react';

interface RegistrationFormHeaderProps {
  closeModal: () => void;
}

const RegistrationFormHeader: React.FC<RegistrationFormHeaderProps> = ({ closeModal }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-gray-900">Complete Your Registration</h3>
      <button 
        onClick={closeModal}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default RegistrationFormHeader;
