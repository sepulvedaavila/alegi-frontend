
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const MockUIContent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div id="how-it-works" className="dashboard-container reveal delay-400">
      <div className="dashboard-image-container relative">
        <img 
          src="/lovable-uploads/04c1ca40-11d3-4671-9557-43d3ae3c22ea.png" 
          alt="Legal prediction dashboard interface" 
          className="dashboard-image"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default MockUIContent;
