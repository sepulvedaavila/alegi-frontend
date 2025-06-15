
import React from 'react';
import { DollarSign, FileText, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
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

const HeroSection: React.FC<HeroSectionProps> = ({
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
    <section className="pt-32 pb-20 bg-gradient-to-b from-[#003366] to-white relative overflow-hidden">
      {/* Background effects similar to homepage */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-white/10 to-white/20 rounded-full blur-3xl -z-10 animate-pulse-soft"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-white/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Lawsuit? Know Your Chances Before You Act.
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Get a clear second opinion on your case with AI-powered predictions – no expensive lawyer consultations needed.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8 space-y-4">
            <div>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
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
            </div>
            
            <Button 
              type="submit"
              className="bg-[#fcb900] hover:bg-[#fcb900]/90 text-[#003366] font-bold px-6 py-3 rounded-md text-lg w-full h-12"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <div className="flex items-center gap-3 bg-blue-800/30 p-4 rounded-lg backdrop-blur-sm">
            <span className="text-blue-300 bg-blue-800/50 p-3 rounded-full">
              <DollarSign size={24} />
            </span>
            <span className="text-lg font-medium text-white">78% of Costs Saved</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-800/30 p-4 rounded-lg backdrop-blur-sm">
            <span className="text-blue-300 bg-blue-800/50 p-3 rounded-full">
              <FileText size={24} />
            </span>
            <span className="text-lg font-medium text-white">Evaluation in plain english</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-800/30 p-4 rounded-lg backdrop-blur-sm">
            <span className="text-blue-300 bg-blue-800/50 p-3 rounded-full">
              <Clock size={24} />
            </span>
            <span className="text-lg font-medium text-white">Results in minutes</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-800/30 p-4 rounded-lg backdrop-blur-sm">
            <span className="text-blue-300 bg-blue-800/50 p-3 rounded-full">
              <Users size={24} />
            </span>
            <span className="text-lg font-medium text-white">Built for anyone</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
