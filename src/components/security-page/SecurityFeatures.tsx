
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { ShieldCheck, Lock, Key, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SecurityFeatures = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  const securityFeatures = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-alegi-blue" />,
      title: "SOC 2 Certification (In Progress)",
      description: "Alegi is actively pursuing SOC 2 Certification to ensure that your data meets the highest standards of security, availability, and confidentiality."
    },
    {
      icon: <Key className="h-10 w-10 text-alegi-blue" />,
      title: "Advanced Encryption Protocols",
      description: "Encryption protects your data in transit and at rest, preventing unauthorized access."
    },
    {
      icon: <Lock className="h-10 w-10 text-alegi-blue" />,
      title: "Strict Access Controls",
      description: "Role-based access limits data exposure and logs all unauthorized attempts."
    },
    {
      icon: <Search className="h-10 w-10 text-alegi-blue" />,
      title: "Regular Security Audits",
      description: "Routine audits identify and mitigate vulnerabilities to maintain platform resilience."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            Our Security Commitment
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            Built with Security at the Core
          </h2>
          <p className="text-lg text-gray-600 reveal delay-200">
            We have designed Alegi's platform with security, compliance, and privacy as top priorities. We go beyond industry standards to provide comprehensive protection, ensuring that your data and case insights remain private and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 reveal delay-300">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-6 p-3 bg-alegi-blue/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
