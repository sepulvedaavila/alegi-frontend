
import React from 'react';

interface LogoProps {
  isScrolled: boolean;
  handleLogoClick: (e: React.MouseEvent) => void;
}

const Logo = ({ isScrolled, handleLogoClick }: LogoProps) => {
  return (
    <div className="flex-shrink-0">
      <a href="/" onClick={handleLogoClick} className="flex items-center">
        {isScrolled ? (
          <img 
            src="/lovable-uploads/f895d413-c639-44b2-9e10-9fd357a8b941.png" 
            alt="Logo" 
            className="h-20" 
          />
        ) : (
          <img 
            src="/lovable-uploads/e78d173f-b1f8-4022-905a-f38caf01b2e8.png" 
            alt="Logo"
            className="h-20" 
          />
        )}
      </a>
    </div>
  );
};

export default Logo;
