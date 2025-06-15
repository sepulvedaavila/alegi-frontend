
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './sidebar/Sidebar';
import { useDashboard } from '@/contexts/DashboardContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { sidebarCollapsed } = useDashboard();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        sidebarCollapsed ? "ml-[60px]" : "ml-[240px]"
      )}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
