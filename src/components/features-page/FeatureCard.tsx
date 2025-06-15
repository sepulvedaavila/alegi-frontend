
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  highlight?: boolean;
  header?: string;
}

const FeatureCard = ({ icon, title, description, delay, highlight = false, header }: FeatureCardProps) => (
  <div className={`reveal ${delay} feature-card h-full ${highlight ? 'border-alegi-blue bg-gradient-to-br from-white to-alegi-blue/5 shadow-md' : ''}`}>
    <div className="flex items-start gap-4 h-full">
      <div className={`feature-icon flex-shrink-0 ${highlight ? 'bg-gradient-to-br from-alegi-blue/20 to-alegi-blue-light/30' : ''}`}>
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

export default FeatureCard;
