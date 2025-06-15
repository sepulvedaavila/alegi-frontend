import React from 'react';

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How accurate are Lumina's predictions?</h3>
              <p className="text-gray-600">
                Lumina™ has been trained on millions of case outcomes and achieves an accuracy rate of 78-86%*
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can Lumina replace my lawyer?</h3>
              <p className="text-gray-600">
                No, Lumina™ is designed to be a supplementary tool, not a replacement for legal representation. We provide insights to help you make informed decisions about whether to pursue a case and what strategy might work best, but for complex legal matters, professional legal counsel is still recommended.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What types of cases can Lumina analyze?</h3>
              <p className="text-gray-600">
                Currently, Lumina™ can analyze personal injury, contract disputes, employment issues, landlord-tenant conflicts, and small claims cases. We're continuously expanding our capabilities to cover more legal areas.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How long does it take to get my assessment?</h3>
              <p className="text-gray-600">
                Most assessments are completed within 5 minutes, but can occasionally may take up to 1 hour for more complex cases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
