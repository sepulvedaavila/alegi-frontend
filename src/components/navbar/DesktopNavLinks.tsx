
import React from 'react';
import NavLink from './NavLink';

interface DesktopNavLinksProps {
  navLinks: Array<{ text: string; path: string }>;
  isScrolled: boolean;
}

const DesktopNavLinks = ({ navLinks, isScrolled }: DesktopNavLinksProps) => {
  return (
    <div className="hidden md:flex items-center justify-center flex-grow">
      <div className="flex space-x-6">
        {navLinks.map((link, index) => (
          <NavLink 
            key={index} 
            path={link.path} 
            text={link.text} 
            isScrolled={isScrolled} 
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopNavLinks;
