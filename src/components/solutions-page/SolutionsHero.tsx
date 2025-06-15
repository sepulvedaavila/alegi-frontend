
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from '@/utils/scrollUtils';
import { useCtaForm } from '@/hooks/useCtaForm';
import FormModal from '@/components/cta/FormModal';
import CalendlyIntegration from '@/components/cta/CalendlyIntegration';

const SolutionsHero = () => {
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
    smoothScrollTo("solutions-cta");
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#003366] to-white -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col justify-center md:col-span-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
              <div className="mb-4">Solutions Tailored for</div>
              <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent">Every Legal Need.</span>
            </h1>
          </div>
          
          <div className="flex flex-col justify-center">
            <p className="text-xl text-white mb-6">
              Empower your practice with AI-driven insights that enhance strategy, efficiency, and outcomes, no matter your firm size or practice area.
            </p>
            
            <div>
              <Button
                onClick={handleDemoClick}
                className="bg-[#fcb900] hover:bg-[#fcb900]/90 text-[#003366] font-bold rounded-full shadow-lg border-2 border-[#fcb900]"
                size="lg"
              >
                Get Free Beta Access – Limited Spots!
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-16 relative">
          <div className="max-w-6xl mx-auto">
            <img 
              src="/lovable-uploads/dc90bc6d-e020-4f6b-9816-c50eee5f2793.png" 
              alt="Alegi Dashboard Mockup" 
              className="w-full h-auto rounded-lg shadow-xl" 
            />
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

export default SolutionsHero;
