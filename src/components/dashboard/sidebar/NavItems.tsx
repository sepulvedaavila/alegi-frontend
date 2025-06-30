import { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Plus,
  BarChart3,
  FileBarChart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/DashboardContext';
import CasesDropdown from './CasesDropdown';
import NewCaseModal from '@/components/cases/NewCaseModal';

const NavItems = () => {
  const { sidebarCollapsed } = useDashboard();
  const location = useLocation();
  const [showCases, setShowCases] = useState(true);
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);

  const toggleCasesDropdown = () => {
    setShowCases(!showCases);
  };

  const handleNewCase = () => {
    setIsNewCaseModalOpen(true);
  };

  // Navigation items with paths to maintain routing structure
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', isLink: true },
    { icon: Plus, label: 'New Case', path: '#', onClick: handleNewCase, isLink: false },
    { icon: BarChart3, label: 'Case Comparison', path: '/dashboard/case-comparison', isLink: true },
    { icon: FileBarChart, label: 'Custom Reports', path: '/dashboard/custom-reports', isLink: true },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', isLink: true },
  ];

  return (
    <>
      <ul className="space-y-1 px-2">
        {navItems.map((item, index) => (
          <li key={item.path}>
            {index === 0 ? (
              <div className="space-y-1">
                <div
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-alegi-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Link
                    to={item.path}
                    className="flex items-center flex-1"
                  >
                    <item.icon size={20} className={cn("flex-shrink-0", sidebarCollapsed ? "mx-auto" : "mr-3")} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                  {!sidebarCollapsed && (
                    <button onClick={toggleCasesDropdown}>
                      {showCases ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  )}
                </div>

                {/* Cases Dropdown */}
                {!sidebarCollapsed && showCases && (
                  <CasesDropdown />
                )}
              </div>
            ) : (
              item.isLink ? (
                <Link
                  to={item.path}
                  className={cn(
                    "flex w-full items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-alegi-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon size={20} className={cn("flex-shrink-0", sidebarCollapsed ? "mx-auto" : "mr-3")} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              ) : (
                <button
                  onClick={item.onClick || (() => {})}
                  className={cn(
                    "flex w-full items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-alegi-blue text-white" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon size={20} className={cn("flex-shrink-0", sidebarCollapsed ? "mx-auto" : "mr-3")} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              )
            )}
          </li>
        ))}
      </ul>

      <NewCaseModal 
        isOpen={isNewCaseModalOpen} 
        onClose={() => setIsNewCaseModalOpen(false)} 
      />
    </>
  );
};

export default NavItems;
