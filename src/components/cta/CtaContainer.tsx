
import React from 'react';
import CtaBenefits from './CtaBenefits';
import MainForm from './MainForm';

interface CtaContainerProps {
  email: string;
  setEmail: (email: string) => void;
  openModal: (e: React.MouseEvent<Element, MouseEvent> | React.FormEvent) => void;
  isLoading: boolean;
}

const CtaContainer: React.FC<CtaContainerProps> = ({ 
  email, 
  setEmail, 
  openModal, 
  isLoading 
}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-2 bg-alegi-blue p-6 md:p-8 text-white flex items-center">
          <CtaBenefits />
        </div>
        
        <div className="md:col-span-3 p-6 md:p-8">
          <div className="reveal">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Don't Miss Out – Join Our Waitlist Today!</h3>
            <p className="text-gray-600 mb-6">Limited spots available. Be among the first to experience ALEGI.</p>
            
            <MainForm 
              email={email}
              setEmail={setEmail}
              openModal={openModal}
              isLoading={isLoading}
            />
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              No credit card required. Waitlist spots are limited!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaContainer;
