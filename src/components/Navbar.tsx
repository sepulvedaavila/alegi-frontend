
import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { MenuIcon, XIcon } from 'lucide-react';

// Import our components
import Logo from './navbar/Logo';
import DesktopNavLinks from './navbar/DesktopNavLinks';
import DesktopActions from './navbar/DesktopActions';
import MobileMenu from './navbar/MobileMenu';
import { useNavbar } from '@/hooks/useNavbar';

const Navbar = () => {
  const { user } = useAuth();
  const { isMenuOpen, isScrolled, toggleMenu } = useNavbar();

  const navLinks = [
    { text: "Features", path: "/features" },
    { text: "Solutions", path: "/solutions" },
    { text: "How It Works", path: "/how-it-works" },
    { text: "Lumina™", path: "/lumina" },
    { text: "Security", path: "/security" },
    { text: "FAQ", path: "/faq" },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 flex items-center">
        <Logo isScrolled={isScrolled} handleLogoClick={handleLogoClick} />
        <DesktopNavLinks navLinks={navLinks} isScrolled={isScrolled} />
        <DesktopActions user={user} isScrolled={isScrolled} />

        <button
          className={cn(
            "md:hidden ml-auto",
            isScrolled ? "text-gray-700" : "text-white"
          )}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        navLinks={navLinks} 
        user={user} 
      />
    </nav>
  );
};

export default React.memo(Navbar);
