
import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  className?: string;
  highlight?: boolean;
  header?: string;
}

const Feature = ({ icon, title, description, delay, className = "", highlight = false, header }: FeatureProps) => (
  <div className={`reveal ${delay} feature-card h-full ${highlight ? 'border-alegi-blue bg-gradient-to-br from-white to-alegi-blue/5 shadow-md' : ''} ${className}`}>
    <div className="flex items-start gap-4 h-full">
      <div className={`feature-icon ${highlight ? 'bg-gradient-to-br from-alegi-blue/20 to-alegi-blue-light/30' : ''}`}>
        {icon}
      </div>
      <div>
        {header && (
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            {header}
          </h3>
        )}
        <h3 className={`text-lg font-semibold mb-2 ${highlight ? 'text-alegi-blue' : ''}`}>{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

export default Feature;
