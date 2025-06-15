
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarouselAutoScroll } from '@/utils/carouselUtils';
import { useCtaForm } from '@/hooks/useCtaForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import RegistrationForm from '@/components/cta/RegistrationForm';
import { useCalendly } from '@/hooks/useCalendly';

const HeroContent = () => {
  const { 
    email, 
    setEmail, 
    isLoading, 
    formData, 
    isSubmitted,
    showCalendly,
    handleInputChange,
    handleFullFormSubmit,
    resetForm
  } = useCtaForm();
  
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Use the Calendly hook to load the script when needed
  useCalendly(isSubmitted && showCalendly && showModal);
  
  const { api, setApi } = useCarouselAutoScroll(3000); // 3 seconds interval

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
      return;
    }
    
    // Instead of openModal, we'll set our own modal state
    setShowModal(true);
  };

  const openModal = () => {
    setTouched(true);
    
    if (!validateEmail(email)) {
      return;
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    if (!isSubmitted) {
      setShowModal(false);
    } else {
      resetForm();
      setShowModal(false);
    }
  };

  return (
    <>
      <Carousel 
        setApi={setApi}
        className="w-full max-w-6xl mx-auto"
        opts={{
          loop: true,
          align: "center",
        }}
        aria-label="Legal prediction features carousel"
      >
        <CarouselContent>
          {/* Slide 1: Legal Predictions with Advanced Insights */}
          <CarouselItem>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-10 leading-tight mx-auto reveal delay-100 px-4 md:px-6 break-words pb-4">
              <span className="inline-block">Legal</span>{" "}
              <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent inline-block pb-2">Predictions</span>
              <br />
              <span className="inline-block">with Advanced</span>{" "}
              <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent inline-block pb-2">Insights</span>
            </h1>
          </CarouselItem>
          
          {/* Slide 2: Predict Legal Outcomes */}
          <CarouselItem>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-10 leading-tight mx-auto reveal delay-100 px-4 md:px-6 break-words pb-4">
              Predict <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent inline-block pb-2">Legal Outcomes</span> <br />
              with <span className="text-white inline-block pb-2">Confidence</span>
            </h1>
          </CarouselItem>
          
          {/* Slide 3: Settlement or Litigate */}
          <CarouselItem>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-10 leading-tight mx-auto reveal delay-100 px-4 md:px-6 break-words pb-4">
              <span className="inline-block">Pursue</span>{" "}
              <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent inline-block pb-2">Settlement</span>{" "}
              <span className="inline-block">or</span> <br />
              <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent inline-block pb-2">Litigate</span>?
            </h1>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      
      <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 reveal delay-200">
        Experience predictions and legal analytics that help you forecast case outcomes with unparalleled confidence and accuracy.
      </p>

      <div className="max-w-md mx-auto mb-8 reveal delay-300">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email to get beta access"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) validateEmail(e.target.value);
              }}
              onBlur={() => {
                setTouched(true);
                validateEmail(email);
              }}
              className="h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white 
                         placeholder:text-white/60 px-4 
                         rounded-lg transition-all duration-300 ease-in-out 
                         hover:bg-white/15 hover:border-white/30
                         focus:outline-none focus:border-white/30 focus:bg-white/15"
            />
            {touched && emailError && (
              <p className="mt-1 text-sm text-amber-300 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {emailError}
              </p>
            )}
          </div>
          
          <Button 
            type="button" // Changed from submit to button
            onClick={openModal} // Added onClick handler
            className="bg-[#fcb900] hover:bg-[#fcb900]/90 text-[#003366] font-bold rounded-lg h-12"
            size="lg"
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
              "Get FREE Early Access Now"
            )}
          </Button>
        </form>
      </div>

      {/* Registration Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Join Our Waitlist</DialogTitle>
            <DialogDescription className="text-center">
              Get early access to our legal prediction platform
            </DialogDescription>
          </DialogHeader>
          
          {!isSubmitted ? (
            <RegistrationForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleFullFormSubmit={handleFullFormSubmit}
              isLoading={isLoading}
              closeModal={closeModal}
            />
          ) : (
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-green-600 mb-4">Success!</h3>
              <p className="mb-4">You've been successfully added to our waitlist!</p>
              {showCalendly && (
                <>
                  <p className="text-sm text-gray-600 mb-6">
                    Schedule a call with our team below:
                  </p>
                  
                  <div 
                    className="calendly-inline-widget w-full" 
                    data-url="https://calendly.com/jmayoral-alegi?hide_gdpr_banner=1" 
                    style={{ minWidth: '320px', height: '700px' }}
                  ></div>
                </>
              )}
              <Button onClick={closeModal} className="mt-4">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroContent;
