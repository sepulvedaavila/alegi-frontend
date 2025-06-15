
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const LogoutButton = () => {
  const { sidebarCollapsed } = useDashboard();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className={cn(
        "flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900",
        sidebarCollapsed ? "justify-center" : ""
      )}
    >
      <LogOut size={20} className={cn("flex-shrink-0", sidebarCollapsed ? "" : "mr-3")} />
      {!sidebarCollapsed && <span>Log out</span>}
    </button>
  );
};

export default LogoutButton;
