
import { useDashboard } from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';
import SidebarHeader from './SidebarHeader';
import NavItems from './NavItems';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const { sidebarCollapsed } = useDashboard();

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
        sidebarCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <SidebarHeader />

      <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
        <NavItems />
      </nav>

      <div className="flex-shrink-0 p-2 border-t border-gray-200">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
