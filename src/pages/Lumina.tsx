
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCtaForm } from '@/hooks/useCtaForm';
import FormModal from '@/components/cta/FormModal';
import CalendlyIntegration from '@/components/cta/CalendlyIntegration';
import { useEmailValidation } from '@/hooks/useEmailValidation';

// Import refactored components
import HeroSection from '@/components/lumina/HeroSection';
import ProblemStatement from '@/components/lumina/ProblemStatement';
import SolutionOverview from '@/components/lumina/SolutionOverview';
import HowItWorks from '@/components/lumina/HowItWorks';
import SampleResults from '@/components/lumina/SampleResults';
import Testimonials from '@/components/lumina/Testimonials';
import PricingSection from '@/components/lumina/PricingSection';
import FAQSection from '@/components/lumina/FAQSection';
import SecuritySection from '@/components/lumina/SecuritySection';
import CTASection from '@/components/lumina/CTASection';

const Lumina = () => {
  const {
    isLoading,
    isModalOpen,
    formData,
    isSubmitted,
    showCalendly,
    handleInputChange,
    openModal,
    closeModal,
    resetForm,
    handleFullFormSubmit
  } = useCtaForm();
  
  const {
    email,
    setEmail,
    emailError,
    setEmailError,
    touched,
    setTouched,
    validateEmail
  } = useEmailValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateEmail(email);
    setEmailError(error);
    setTouched(true);

    if (!error) {
      openModal(e);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Lumina™ by ALEGI - Know Your Legal Case Chances Before You Act</title>
        <meta name="description" content="Get a clear second opinion on your legal case with AI-powered predictions – no expensive lawyer consultations needed." />
      </Helmet>
      
      <Navbar />
      
      <HeroSection 
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        touched={touched}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        setTouched={setTouched}
        setEmailError={setEmailError}
        validateEmail={validateEmail}
      />
      
      <ProblemStatement />
      
      <SolutionOverview />
      
      <HowItWorks />
      
      <SampleResults />
      
      <Testimonials />
      
      <PricingSection />
      
      <FAQSection />
      
      <SecuritySection />
      
      <CTASection 
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        touched={touched}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        setTouched={setTouched}
        setEmailError={setEmailError}
        validateEmail={validateEmail}
      />
      
      <FormModal
        isModalOpen={isModalOpen}
        isSubmitted={isSubmitted}
        showCalendly={showCalendly}
        formData={formData}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleFullFormSubmit={handleFullFormSubmit}
        closeModal={closeModal}
        resetForm={resetForm}
      />

      <CalendlyIntegration showCalendly={showCalendly} />
      
      <Footer />
    </>
  );
};

export default Lumina;
