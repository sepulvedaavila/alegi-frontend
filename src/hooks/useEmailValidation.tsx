
import { useState } from 'react';

export function useEmailValidation(initialEmail: string = '') {
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (emailValue: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) return "Please enter your email address";
    if (!regex.test(emailValue)) return "Please enter a valid email";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (touched) {
      setEmailError(validateEmail(newEmail));
    }
  };

  const handleEmailBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  return {
    email,
    setEmail,
    emailError,
    setEmailError,
    touched,
    setTouched,
    validateEmail,
    handleEmailChange,
    handleEmailBlur
  };
}
