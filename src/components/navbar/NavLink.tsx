
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  path: string;
  text: string;
  isScrolled: boolean;
  className?: string;
}

const NavLink = ({ path, text, isScrolled, className }: NavLinkProps) => {
  const linkClass = cn(
    "font-medium transition-colors",
    isScrolled 
      ? "text-gray-700 hover:text-alegi-blue" 
      : "text-white hover:text-white/80",
    className
  );

  if (path.startsWith('/')) {
    return (
      <Link to={path} className={linkClass}>
        {text}
      </Link>
    );
  }
  
  return (
    <a href={path} className={linkClass}>
      {text}
    </a>
  );
};

export default NavLink;
