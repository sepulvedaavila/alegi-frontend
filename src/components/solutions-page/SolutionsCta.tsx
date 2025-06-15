
import { useCtaForm } from '@/hooks/useCtaForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import FormModal from '@/components/cta/FormModal';
import CalendlyIntegration from '@/components/cta/CalendlyIntegration';

const SolutionsCta = () => {
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

  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section id="solutions-cta" className="py-24 bg-gradient-to-b from-alegi-blue/5 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden border-0">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-alegi-blue to-alegi-blue-dark text-white py-12 px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal">
                Ready to See How We Can Empower Your Legal Practice?
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-lg mx-auto reveal delay-100">
                Discover how ALEGI can transform your legal strategy with AI-powered insights tailored to your practice.
              </p>
              <div className="reveal delay-200">
                <Button 
                  onClick={openModal}
                  size="lg" 
                  className="bg-white text-alegi-blue hover:bg-white/90 hover:text-alegi-blue-dark"
                >
                  Schedule Your Demo Today
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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

export default SolutionsCta;
