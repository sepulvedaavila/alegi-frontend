
import React from 'react';
import { Shield, Lock, Database, UserCheck } from 'lucide-react';

const SecuritySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Privacy Is Our Priority
          </h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Shield className="text-blue-600" size={40} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Bank-Level Encryption</h3>
            <p className="text-gray-600 text-sm">
              All your data is protected with 256-bit encryption
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Lock className="text-blue-600" size={40} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Confidential</h3>
            <p className="text-gray-600 text-sm">
              Your case details remain private and secure
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <Database className="text-blue-600" size={40} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Control</h3>
            <p className="text-gray-600 text-sm">
              Delete your data at any time with one click
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <UserCheck className="text-blue-600" size={40} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Third-Parties</h3>
            <p className="text-gray-600 text-sm">
              We never share your information with third parties
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8 max-w-2xl mx-auto">
          <p className="text-gray-700">
            We understand legal matters are sensitive. Your case details remain private, secure, and accessible only to you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
