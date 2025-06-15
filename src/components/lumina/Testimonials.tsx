
import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            People Like You Who Found Clarity with Lumina
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">Sarah T.</h3>
              <p className="text-sm text-gray-600">Small Business Owner</p>
            </div>
            <p className="text-gray-700">
              "I was facing a contract dispute and wasn't sure if I had a case. Lumina gave me a clear 75% chance of success and explained why in terms I could understand. I pursued it and won!"
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">Michael R.</h3>
              <p className="text-sm text-gray-600">Homeowner</p>
            </div>
            <p className="text-gray-700">
              "The assessment saved me from pursuing a weak case against my contractor. Lumina showed me I only had a 30% chance of winning, saving me thousands in legal fees for a case I likely would have lost."
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">Priya K.</h3>
              <p className="text-sm text-gray-600">Tech Professional</p>
            </div>
            <p className="text-gray-700">
              "I was offered a settlement for my workplace issue but wasn't sure if it was fair. Lumina's analysis showed it was actually below average for similar cases, giving me confidence to negotiate for more."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
