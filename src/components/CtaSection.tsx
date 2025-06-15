
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { useCtaForm } from '@/hooks/useCtaForm';
import CtaContainer from './cta/CtaContainer';
import FormModal from './cta/FormModal';
import CalendlyIntegration from './cta/CalendlyIntegration';

const CtaSection = () => {
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
    <section id="signup" className="section bg-gradient-to-b from-alegi-blue/5 to-white" ref={sectionRef}>
      <div className="container">
        <CtaContainer 
          email={email}
          setEmail={setEmail}
          openModal={openModal}
          isLoading={isLoading}
        />
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

export default CtaSection;
