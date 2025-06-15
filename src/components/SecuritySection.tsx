
import { Lock, Scale } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section id="security" className="section bg-alegi-gray-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal">
              Your Data's Security Is Our Priority
            </h2>
          </div>
          
          <div className="prose prose-lg mx-auto reveal delay-100">
            <p className="text-gray-700 mb-8">
              ALEGI prioritizes the confidentiality and security of your sensitive legal data. We understand the critical nature 
              of privacy in legal work, which is why our platform is built on a foundation of industry-leading security measures. 
              This includes robust encryption and a secure, closed model, guaranteeing your information remains private and 
              accessible only to authorized users.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center reveal delay-200">
                <div className="w-14 h-14 rounded-full bg-alegi-blue/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-alegi-blue" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">End-to-End Encryption</h3>
                <p className="text-gray-600">
                  Your data is encrypted in transit and at rest, ensuring only you can access it.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center reveal delay-400">
                <div className="w-14 h-14 rounded-full bg-alegi-blue/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-alegi-blue" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Confidential & Secure</h3>
                <p className="text-gray-600">
                  Our AI processes your data automatically, without human intervention, maintaining the highest ethical and privacy standards.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mt-8 text-center font-medium reveal delay-500">
              Your trust is our priority. With ALEGI, you can confidently explore AI-powered legal insights, 
              knowing your data is secure, private, and protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
