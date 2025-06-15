
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavLink from './NavLink';
import { smoothScrollTo } from '@/utils/scrollUtils';

interface MobileMenuProps {
  isMenuOpen: boolean;
  navLinks: Array<{ text: string; path: string }>;
  user: any;
}

const MobileMenu = ({ isMenuOpen, navLinks, user }: MobileMenuProps) => {
  if (!isMenuOpen) return null;

  const handleDemoClick = () => {
    smoothScrollTo("signup");
  };

  return (
    <div id="mobile-menu" className="md:hidden bg-white border-t">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            path={link.path}
            text={link.text}
            isScrolled={true}
            className="block py-2"
          />
        ))}
        
        {user ? (
          <div className="flex flex-col space-y-2 pt-2">
            <Link to="/dashboard" className="block">
              <Button className="w-full">Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 pt-2">
            <Link to="/auth" className="block py-2 text-gray-700 hover:text-alegi-blue font-medium transition-colors">
              Sign In
            </Link>
            <Link to="/auth" className="block">
              <Button 
                variant="outline" 
                className="w-full border-2 border-yellow-400 bg-transparent"
              >
                Sign Up
              </Button>
            </Link>
            <Button 
              onClick={handleDemoClick}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800"
            >
              Request Demo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
