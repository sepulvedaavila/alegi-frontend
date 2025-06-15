
import { useState } from 'react';
import { FormData } from '@/components/cta/FormTypes';
import { validateField as validateFieldUtil, validateForm as validateFormUtil } from '@/utils/validationUtils';

// Define ValidationErrors interface within the hook to ensure type compatibility
export interface ValidationErrors {
  [key: string]: string | undefined;
}

export function useFormValidation(initialFormData: FormData) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateSingleField = (name: string, value: string) => {
    const error = validateFieldUtil(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const markFieldAsTouched = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const markAllFieldsTouched = () => {
    const allTouched = Object.keys(initialFormData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);
  };

  const validateAllFields = (formData: FormData) => {
    const newErrors = validateFormUtil(formData);
    // Convert the validation errors to our internal format
    const typedErrors: ValidationErrors = {};
    Object.entries(newErrors).forEach(([key, value]) => {
      typedErrors[key] = value;
    });
    
    setErrors(typedErrors);
    return Object.keys(typedErrors).length === 0;
  };

  return {
    errors,
    touched,
    validateSingleField,
    markFieldAsTouched,
    markAllFieldsTouched,
    validateAllFields
  };
}
