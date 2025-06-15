
import React from 'react';

const ProblemStatement: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            The Frustration of Navigating Legal Issues Alone
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-amber-50/70 p-6 rounded-lg border border-amber-100">
              <h3 className="font-semibold text-xl mb-3 text-gray-800">Expensive Consultations</h3>
              <p className="text-gray-600">
                Trying to understand if your lawsuit has merit can cost hundreds in lawyer fees, just for an initial consultation.
              </p>
            </div>
            
            <div className="bg-amber-50/70 p-6 rounded-lg border border-amber-100">
              <h3 className="font-semibold text-xl mb-3 text-gray-800">Legal Jargon</h3>
              <p className="text-gray-600">
                Legal language can feel like a foreign language, leaving you unsure about your next steps.
              </p>
            </div>
            
            <div className="bg-amber-50/70 p-6 rounded-lg border border-amber-100">
              <h3 className="font-semibold text-xl mb-3 text-gray-800">Financial Risk</h3>
              <p className="text-gray-600">
                Don't risk valuable time and money on a case without knowing your odds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
