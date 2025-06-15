
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';

const SidebarHeader = () => {
  const { sidebarCollapsed, toggleSidebar } = useDashboard();

  return (
    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
      <Link 
        to="/dashboard" 
        className={cn("flex items-center", sidebarCollapsed ? "justify-center w-full" : "")}
      >
        <img 
          src="/lovable-uploads/f895d413-c639-44b2-9e10-9fd357a8b941.png" 
          alt="ALEGI Logo" 
          className={cn("h-8 transition-all", sidebarCollapsed ? "mx-auto" : "mr-2")} 
        />
        {/* Removed "ALEGI" text next to the logo */}
      </Link>
      <button 
        onClick={toggleSidebar}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );
};

export default SidebarHeader;
