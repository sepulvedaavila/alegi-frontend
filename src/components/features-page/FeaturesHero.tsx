
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from '@/utils/scrollUtils';
import { useCtaForm } from '@/hooks/useCtaForm';
import FormModal from '@/components/cta/FormModal';
import CalendlyIntegration from '@/components/cta/CalendlyIntegration';
import StatisticCard from './StatisticCard';

const FeaturesHero = () => {
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
    // Instead of opening the modal directly, we'll scroll to the CTA section
    smoothScrollTo("features-cta");
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#003366] to-white -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col justify-center md:col-span-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
              <div className="mb-4">Superior insights for</div>
              <span className="bg-gradient-to-r from-[#fcb900] to-[#fcb900] bg-clip-text text-transparent">quicker legal decisions.</span>
            </h1>
          </div>
          
          <div className="flex flex-col justify-center">
            <p className="text-xl text-white mb-6">
              Tired of slow legal research? Alegi delivers instant, case insights and predictions, empowering you to find answers faster, build stronger arguments with data-driven confidence, and execute winning strategies.
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
        
        <div className="py-8 relative">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#003366] text-center mb-10">
            AI's effectiveness is streamlining legal workflows.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <StatisticCard 
              percentage="47%" 
              description="faster legal research using AI-powered tools compared to traditional methods"
            />
            
            <StatisticCard 
              percentage="78%" 
              description="of large firms are increasing their AI adoption, firmly establishing AI as crucial for a continued competitive edge"
            />
            
            <StatisticCard 
              percentage="74%" 
              description="of hourly billable tasks have potential for AI automation, while 37% of unbillable hours could be reduced"
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

export default FeaturesHero;
