
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { throttle } from '@/utils/performanceUtils';

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 10);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return {
    isMenuOpen,
    isScrolled,
    toggleMenu
  };
}
