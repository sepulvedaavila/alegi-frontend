
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { UserCheck, FileCheck, Scale } from 'lucide-react';

const PrivacyMeasures = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  const privacyMeasures = [
    {
      icon: <UserCheck className="h-6 w-6 text-white" />,
      title: "Data Anonymization",
      description: "Ensuring that sensitive information remains untraceable through advanced anonymization techniques."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-white" />,
      title: "Confidentiality Assurance",
      description: "Adhering to strict confidentiality standards to protect your legal information."
    },
    {
      icon: <Scale className="h-6 w-6 text-white" />,
      title: "Legal and Ethical Compliance",
      description: "Meeting GDPR and other international data protection regulations for comprehensive coverage."
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-alegi-blue to-alegi-blue-dark text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-white/20 text-white text-sm font-medium mb-4 reveal">
            Privacy and Confidentiality
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal delay-100">
            Protecting Your Privacy Every Step of the Way
          </h2>
          <p className="text-lg text-white/90 reveal delay-200">
            Legal data demands the highest levels of confidentiality. Alegi implements strict privacy policies to protect your sensitive information and guarantee compliance with all relevant data protection laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {privacyMeasures.map((measure, index) => (
            <div key={index} className="text-center reveal delay-300">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                {measure.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{measure.title}</h3>
              <p className="text-white/80">{measure.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyMeasures;
