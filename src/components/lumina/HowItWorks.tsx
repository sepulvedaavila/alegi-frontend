
import React from 'react';
import { ClipboardList, Brain, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Getting Answers Is Simple
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Three easy steps to understand if your case is worth pursuing
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 text-center relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div className="flex justify-center mb-6">
              <ClipboardList size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Your Case Details</h3>
            <p className="text-gray-600">
              Tell us about your situation through our easy, guided questions – no legal background needed.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div className="flex justify-center mb-6">
              <Brain size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our AI Analyzes Your Case</h3>
            <p className="text-gray-600">
              Our smart AI analyzes your details, comparing them to thousands of past cases and relevant legal information.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div className="flex justify-center mb-6">
              <CheckCircle size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Your Assessment Report</h3>
            <p className="text-gray-600">
              Receive a straightforward report with your case strength, potential outcomes, and clear recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
