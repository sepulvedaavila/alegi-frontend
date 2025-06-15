
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface MainFormProps {
  email: string;
  setEmail: (email: string) => void;
  openModal: (e: React.MouseEvent<Element, MouseEvent> | React.FormEvent) => void;
  isLoading: boolean;
}

const MainForm = ({ email, setEmail, openModal, isLoading }: MainFormProps) => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const isMobile = useIsMobile();

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError("Please enter your email address");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    
    setEmailError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    if (!validateEmail(email)) {
      toast(emailError || "Please enter a valid email address", {
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      });
      return;
    }
    
    openModal(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched) validateEmail(e.target.value);
          }}
          onBlur={() => {
            setTouched(true);
            validateEmail(email);
          }}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-alegi-blue focus:border-alegi-blue transition-colors ${
            touched && emailError ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {touched && emailError && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {emailError}
          </p>
        )}
      </div>
      
      <Button 
        type="submit"
        className="flex items-center justify-center bg-alegi-blue hover:bg-alegi-blue/90 text-white font-medium px-6 py-2 rounded-full w-full h-12"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span>{isMobile ? "Join Waitlist" : "Get Free Beta Access – Limited Spots!"}</span>
        )}
      </Button>
    </form>
  );
};

export default MainForm;
