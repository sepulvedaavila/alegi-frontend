
import React from 'react';
import { cn } from '@/lib/utils';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLeft: boolean;
  delay: string;
}

const ProcessStep = ({ number, title, description, icon, isLeft, delay }: ProcessStepProps) => {
  return (
    <div className={`md:grid md:grid-cols-2 md:gap-8 items-center mb-16 last:mb-0 reveal ${delay}`}>
      {/* Step content */}
      <div className={cn(
        "md:p-6 relative z-10",
        isLeft ? "md:text-right md:order-1" : "md:order-2"
      )}>
        <div 
          className={cn(
            "inline-block bg-gradient-to-r from-alegi-blue to-alegi-blue-light rounded-full w-12 h-12 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md",
            "md:absolute md:top-1/2 md:-translate-y-1/2",
            isLeft ? "md:-right-6" : "md:-left-6"
          )}
        >
          {number}
        </div>
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      {/* Step icon */}
      <div className={cn(
        "hidden md:flex items-center justify-center p-8 mt-8 md:mt-0",
        isLeft ? "md:order-2" : "md:order-1"
      )}>
        <div className="bg-gradient-to-br from-alegi-blue/10 to-alegi-blue-light/30 rounded-xl p-8 inline-flex shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          {icon}
        </div>
      </div>
      
      {/* Mobile-only icon (hidden on md and up) */}
      <div className="flex md:hidden items-center justify-center mt-4 mb-6">
        <div className="bg-gradient-to-br from-alegi-blue/10 to-alegi-blue-light/30 rounded-xl p-6 inline-flex">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ProcessStep;
