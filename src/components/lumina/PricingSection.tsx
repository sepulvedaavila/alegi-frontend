
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { smoothScrollTo } from '@/utils/scrollUtils';

const PricingSection: React.FC = () => {
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('cta-section');
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Affordable Insights, Empowering Decisions
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A fraction of the cost of a single lawyer consultation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lumina Basic</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-gray-900">$49</span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Outcome prediction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Detailed financial projections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Lawyer recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Basic recommendations</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={handleCTAClick}
              >
                Get Started
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-600 transform scale-105">
            <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
              MOST POPULAR
            </div>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lumina Standard</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Case strength analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Risk assessment breakdown</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Evidence strength analysis</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={handleCTAClick}
              >
                Get Started
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lumina Pro</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-gray-900">$199</span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Everything in Standard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Strategic recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Cost estimate</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Related laws to your case</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span>Settlement vs trial analysis</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={handleCTAClick}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-600">
          <p className="flex items-center justify-center">
            <CheckCircle className="text-green-500 mr-2" size={16} />
            Money-Back Guarantee: Not satisfied with your assessment? We'll refund your payment within 7 days.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
