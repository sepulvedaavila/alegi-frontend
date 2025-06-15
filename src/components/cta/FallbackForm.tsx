
import React from 'react';
import { FormData } from './FormTypes';

interface FallbackFormProps {
  formData: FormData;
}

const FallbackForm: React.FC<FallbackFormProps> = ({ formData }) => {
  return (
    <form 
      action="https://formspree.io/f/xkgjobbk" 
      method="POST"
      id="direct-formspree-form"
      style={{ display: 'none' }}
    >
      <input type="text" name="name" value={formData.name} readOnly />
      <input type="text" name="company" value={formData.company} readOnly />
      <input type="tel" name="telephone" value={formData.telephone} readOnly />
      <input type="email" name="email" value={formData.email} readOnly />
      <input type="text" name="industry" value={formData.industry || ''} readOnly />
      <input type="hidden" name="_subject" value={`New ALEGI Waitlist Registration: ${formData.name} from ${formData.company}`} />
      <input type="hidden" name="_next" value={window.location.href} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FallbackForm;
