
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { smoothScrollTo } from '@/utils/scrollUtils';

interface DesktopActionsProps {
  user: any;
  isScrolled: boolean;
}

const DesktopActions = ({ user, isScrolled }: DesktopActionsProps) => {
  const handleDemoClick = () => {
    smoothScrollTo("signup");
  };

  return (
    <div className="hidden md:flex ml-auto items-center space-x-4">
      {user ? (
        <Link to="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      ) : (
        <>
          <Link to="/auth" className={cn(
            "font-medium transition-colors",
            isScrolled 
              ? "text-gray-700 hover:text-alegi-blue" 
              : "text-white hover:text-white/80"
          )}>
            Sign In
          </Link>
          <Link to="/auth">
            <Button 
              variant="outline" 
              className={cn(
                "border-2 bg-transparent",
                isScrolled 
                  ? "border-yellow-400 text-gray-700 hover:bg-yellow-50" 
                  : "border-yellow-400 text-white hover:bg-yellow-400/10"
              )}
            >
              Sign Up
            </Button>
          </Link>
          <Button 
            onClick={handleDemoClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800"
          >
            Request Demo
          </Button>
        </>
      )}
    </div>
  );
};

export default DesktopActions;
