
import { FormData } from '@/components/cta/FormTypes';

export interface ValidationErrors {
  name?: string;
  company?: string;
  telephone?: string;
  email?: string;
  industry?: string;
}

// Validate specific field
export const validateField = (name: string, value: string): string | undefined => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name should contain only letters, spaces, hyphens and apostrophes';
      return undefined;
    
    case 'company':
      if (!value.trim()) return 'Company is required';
      if (value.length < 2) return 'Company name is too short';
      return undefined;
    
    case 'telephone':
      if (!value.trim()) return 'Phone number is required';
      // Allow international format with +, digits, spaces, parentheses and dashes
      if (!/^[+]?[\d\s()+\-]{7,}$/.test(value)) {
        return 'Please enter a valid phone number';
      }
      return undefined;
    
    case 'email':
      if (!value.trim()) return 'Email is required';
      // Basic email validation regex
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return undefined;
    
    case 'industry':
      if (!value.trim()) return 'Industry is required';
      return undefined;
    
    default:
      return undefined;
  }
};

// Validate all fields for form submission
export const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  Object.entries(formData).forEach(([field, value]) => {
    const error = validateField(field, value);
    if (error) {
      errors[field as keyof ValidationErrors] = error;
    }
  });
  
  return errors;
};

