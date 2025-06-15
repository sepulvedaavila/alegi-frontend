
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { Shield, RefreshCw, AlertTriangle, Network } from 'lucide-react';

const ContinuousSecurity = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8 reveal">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
              Evolving to Stay Ahead of Threats
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto reveal delay-200">
              Cybersecurity is an ongoing process. We continuously enhance our security protocols and stay ahead of emerging threats to protect your data and ensure compliance with evolving industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center reveal delay-300">
              <div className="w-12 h-12 rounded-full bg-alegi-blue/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-alegi-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Proactive Monitoring</h3>
              <p className="text-gray-600 text-sm">
                24/7 surveillance of our systems to detect and address potential security issues.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center reveal delay-400">
              <div className="w-12 h-12 rounded-full bg-alegi-blue/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-alegi-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Threat Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Staying informed about new security threats to implement preemptive measures.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center reveal delay-500">
              <div className="w-12 h-12 rounded-full bg-alegi-blue/10 flex items-center justify-center mx-auto mb-4">
                <Network className="h-6 w-6 text-alegi-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Regular Updates</h3>
              <p className="text-gray-600 text-sm">
                Consistent updates to our security systems to address emerging vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContinuousSecurity;
