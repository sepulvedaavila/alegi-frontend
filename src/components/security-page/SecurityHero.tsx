
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from '@/utils/scrollUtils';
import { useCtaForm } from '@/hooks/useCtaForm';
import FormModal from '@/components/cta/FormModal';
import CalendlyIntegration from '@/components/cta/CalendlyIntegration';

const SecurityHero = () => {
  const {
    email,
    setEmail,
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

  const handleDemoClick = () => {
    smoothScrollTo("security-cta");
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e1a47] to-[#5f407a] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col justify-center md:col-span-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
              Always Keeping Your <span className="bg-gradient-to-r from-[#a287ff] to-[#d4c5ff] bg-clip-text text-transparent">Data Safe.</span>
            </h1>
          </div>
          
          <div className="flex flex-col justify-center">
            <p className="text-xl text-white mb-6">
              We are dedicated to providing the strongest data protection, security, and confidentiality so you can confidently leverage our AI-driven legal insights.
            </p>
            
            <div>
              <Button
                onClick={handleDemoClick}
                className="bg-white hover:bg-white/90 text-[#3366FF] font-bold rounded-full shadow-lg"
                size="lg"
              >
                Learn About Our Security
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-16 relative">
          <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <div className="glass-panel rounded-xl overflow-hidden border border-white/20">
              <img 
                src="/lovable-uploads/329717e2-4af2-411d-af3b-fa8d7b70b9f6.png"
                alt="Alegi Security" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default SecurityHero;
