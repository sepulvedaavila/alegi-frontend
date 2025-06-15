
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { CheckCircle } from 'lucide-react';

const ComplianceCertification = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  const certifications = [
    {
      title: "SOC 2 Certification",
      description: "Ensuring compliance with security, availability, and confidentiality.",
      status: "In Progress"
    },
    {
      title: "ISO 27001 Compliance",
      description: "Aligning with globally recognized information security management systems.",
      status: "Planned"
    },
    {
      title: "GDPR Compliance",
      description: "Safeguarding data privacy for clients in European jurisdictions.",
      status: "Implemented"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            Compliance and Certification
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            Meeting the Highest Industry Standards
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            Alegi is committed to achieving and maintaining compliance with global security standards to protect client data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300 reveal delay-300"
            >
              <div className="w-16 h-16 rounded-full bg-alegi-blue/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-alegi-blue" />
              </div>
              <div className="inline-block px-3 py-1 bg-alegi-blue/10 rounded-full text-alegi-blue text-xs font-medium mb-4">
                {cert.status}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{cert.title}</h3>
              <p className="text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceCertification;
