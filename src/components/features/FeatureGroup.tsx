
import React from 'react';
import Feature from './Feature';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  className?: string;
  highlight?: boolean;
}

interface FeatureGroupProps {
  features: FeatureItem[];
}

const FeatureGroup = ({ features }: FeatureGroupProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((feature, index) => (
      <Feature
        key={index}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
        delay={feature.delay}
        highlight={feature.highlight}
        className={feature.className}
      />
    ))}
  </div>
);

export default FeatureGroup;
