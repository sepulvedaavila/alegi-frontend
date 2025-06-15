
import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Updated background with gradient from dark blue to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003366] to-white -z-10"></div>
      
      {/* Decorative elements with adjusted colors */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-white/10 to-white/20 rounded-full blur-3xl -z-10 animate-pulse-soft"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-white/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-white/10 to-white/30 rounded-full blur-3xl -z-10 animate-float"></div>
    </>
  );
};

export default HeroBackground;
