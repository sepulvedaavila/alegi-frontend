
import React from 'react';
import { Button } from '@/components/ui/button';
import { smoothScrollTo } from '@/utils/scrollUtils';

const WhyJoinSection = () => {
  const benefits = [
    {
      title: "Case Outcome Prediction",
      description: "Harness the power of AI to predict case outcomes with remarkable accuracy, drawing insights from historical legal precedents and case data."
    },
    {
      title: "Settlement vs. Trial Analysis",
      description: "Make informed decisions with our comparative analysis tools that evaluate the potential outcomes of settling versus going to trial."
    },
    {
      title: "Risk Assessment",
      description: "Identify and quantify legal risks early in the process, allowing for proactive strategy adjustments and resource allocation."
    },
    {
      title: "Judge Analytics",
      description: "Gain insights into judicial tendencies and decision patterns to better prepare your arguments and case presentation."
    },
    {
      title: "Strategic Planning Tools",
      description: "Develop comprehensive legal strategies informed by data-driven insights and probability analyses."
    },
    {
      title: "Cost-Effective Solution",
      description: "Reduce research time and increase efficiency, allowing you to take on more cases or dedicate more time to complex matters."
    }
  ];

  const handleScrollToCta = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('cta-section', undefined, 10);
  };

  return (
    <section 
      id="why-join" 
      className="py-20 bg-gradient-to-br from-[#003366] to-[#0066cc] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why ALEGI?
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Join a growing community of forward-thinking legal professionals who are embracing AI to transform their practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-white/90">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button 
            className="flex items-center justify-center bg-white text-[#0066cc] hover:bg-gray-50 font-medium px-6 py-2 rounded-full h-12"
            onClick={handleScrollToCta}
          >
            Get Free Beta Access – Limited Spots!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
