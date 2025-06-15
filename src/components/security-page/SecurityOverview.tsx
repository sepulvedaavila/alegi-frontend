
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { Shield, Lock } from 'lucide-react';

const SecurityOverview = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
            Why Security Matters in Legal AI
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
            Security You Can Trust
          </h2>
          <p className="text-lg text-gray-600 mb-12 reveal delay-200">
            When handling sensitive legal information, security isn't optional—it's essential. Alegi ensures your data is protected at every step, giving you confidence in our platform's reliability and commitment to confidentiality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-alegi-blue/5 to-alegi-blue-light/10 p-8 rounded-xl reveal delay-300">
            <div className="w-14 h-14 rounded-full bg-alegi-blue/10 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-alegi-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Advanced Security Protocols</h3>
            <p className="text-gray-600">
              Our sophisticated security infrastructure employs multiple layers of protection to safeguard your sensitive legal data, ensuring it remains private and secure at all times.
            </p>
          </div>

          <div className="bg-gradient-to-r from-alegi-blue/5 to-alegi-blue-light/10 p-8 rounded-xl reveal delay-400">
            <div className="w-14 h-14 rounded-full bg-alegi-blue/10 flex items-center justify-center mb-6">
              <Lock className="h-6 w-6 text-alegi-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Commitment to Confidentiality</h3>
            <p className="text-gray-600">
              We understand the critical nature of legal confidentiality. Our platform is designed with privacy at its core, ensuring your case information remains protected and only accessible to authorized users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityOverview;
