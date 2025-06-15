
import { FormEvent } from 'react';
import { FormData } from './FormTypes';
import FormField from './FormField';
import RegistrationFormHeader from './RegistrationFormHeader';
import SubmitButton from './SubmitButton';
import IndustrySelect from './IndustrySelect';
import FallbackForm from './FallbackForm';
import { useFormValidation } from '@/hooks/useFormValidation';

interface RegistrationFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFullFormSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  closeModal: () => void;
}

const RegistrationForm = ({ 
  formData, 
  handleInputChange, 
  handleFullFormSubmit, 
  isLoading, 
  closeModal 
}: RegistrationFormProps) => {
  const {
    errors,
    touched,
    validateSingleField,
    markFieldAsTouched,
    markAllFieldsTouched,
    validateAllFields
  } = useFormValidation(formData);

  // Custom change handler to add validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    markFieldAsTouched(name);
    
    // Validate on change
    validateSingleField(name, value);
    
    // Call the original change handler
    handleInputChange(e);
  };

  // Handle select change for industry
  const handleIndustryChange = (value: string) => {
    // Create a mock event object that mimics the structure expected by handleInputChange
    const mockEvent = {
      target: {
        name: 'industry',
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(mockEvent);
    markFieldAsTouched('industry');
    validateSingleField('industry', value);
  };

  // Custom submit handler with validation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    markAllFieldsTouched();
    
    // Validate all fields
    const isValid = validateAllFields(formData);
    
    // Only proceed if form is valid
    if (isValid) {
      // Track conversion event before form submission
      if (typeof window !== 'undefined') {
        try {
          window.gtag('event', 'conversion_event_submit_lead_form');
        } catch (error) {
          console.error('Google Analytics tracking error:', error);
        }
      }
      
      handleFullFormSubmit(e);
    }
  };

  return (
    <>
      <RegistrationFormHeader closeModal={closeModal} />
      
      {/* Primary form with JS handler */}
      <form 
        onSubmit={handleSubmit}
        className="space-y-4"
        id="js-form"
      >
        <input type="hidden" name="_next" value={window.location.href} />
        
        <FormField
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => markFieldAsTouched('name')}
          placeholder="John Doe"
          error={errors.name}
          touched={!!touched.name}
          label="Name"
        />
        
        <FormField
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onBlur={() => markFieldAsTouched('company')}
          placeholder="ABC Law Firm"
          error={errors.company}
          touched={!!touched.company}
          label="Company"
        />
        
        <FormField
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          onBlur={() => markFieldAsTouched('telephone')}
          placeholder="+1 (555) 123-4567"
          error={errors.telephone}
          touched={!!touched.telephone}
          type="tel"
          label="Telephone"
        />
        
        <FormField
          id="modal-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => markFieldAsTouched('email')}
          placeholder="you@example.com"
          error={errors.email}
          touched={!!touched.email}
          type="email"
          label="Email"
        />
        
        <IndustrySelect 
          value={formData.industry || ""} 
          onValueChange={handleIndustryChange} 
          error={errors.industry}
          touched={!!touched.industry}
        />
        
        <SubmitButton isLoading={isLoading} />
      </form>
      
      {/* Fallback form - direct to Formspree */}
      <FallbackForm formData={formData} />
    </>
  );
};

export default RegistrationForm;

