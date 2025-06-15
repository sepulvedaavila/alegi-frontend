
import React from 'react';
import { BarChart3, FileText, DollarSign, Compass } from 'lucide-react';

const SolutionOverview: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Introducing Lumina™: Your AI-Powered Ally for Legal Case Insights
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Making sense of your legal situation with the power of data, in plain English.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="/lovable-uploads/86251af1-ea21-4b4c-8543-a962324fca10.png" alt="Lumina dashboard mockup" className="w-full" />
            </div>
          </div>
          
          <div className="md:w-1/2 space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-blue-600 mt-1">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Strength Analysis</h3>
                <p className="text-gray-600">
                  Understand your potential for success with a clear percentage score based on similar cases.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-blue-600 mt-1">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Plain English Explanations</h3>
                <p className="text-gray-600">
                  We break down the complexities, explaining why your case is strong or weak in simple terms you can understand.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-blue-600 mt-1">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Risk Assessment</h3>
                <p className="text-gray-600">
                  See the potential costs involved and what you might realistically recover, helping you make informed financial decisions.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-blue-600 mt-1">
                <Compass size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Next Steps Guidance</h3>
                <p className="text-gray-600">
                  Get clear, actionable recommendations on whether to pursue, settle, or reconsider your legal options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionOverview;
