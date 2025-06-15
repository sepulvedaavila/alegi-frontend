
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  email: string;
  setEmail: (email: string) => void;
  emailError: string;
  touched: boolean;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  validateEmail: (email: string) => string;
}

const CTASection: React.FC<CTASectionProps> = ({
  email,
  setEmail,
  emailError,
  touched,
  isLoading,
  handleSubmit,
  setTouched,
  setEmailError,
  validateEmail
}) => {
  return (
    <section id="cta-section" className="py-16 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Clarity on Your Legal Situation Today
          </h2>
          <p className="text-xl mb-8">
            Stop wondering and get data-driven answers about your case
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) setEmailError(validateEmail(e.target.value));
              }}
              onBlur={() => {
                setTouched(true);
                setEmailError(validateEmail(email));
              }}
            />
            {touched && emailError && <p className="text-amber-300 text-sm mt-1">{emailError}</p>}
            
            <Button 
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Join the Waitlist to Assess your Case"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
