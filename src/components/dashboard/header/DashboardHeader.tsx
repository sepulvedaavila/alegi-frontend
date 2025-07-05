import { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import useBackendHealth from '@/hooks/useBackendHealth';

interface DashboardHeaderProps {
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

const DashboardHeader = ({ onFavoriteToggle, isFavorite }: DashboardHeaderProps) => {
  const { recentCases } = useDashboard();
  const { health, isLoading } = useBackendHealth({
    checkInterval: 60000,
    autoCheck: true
  });

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'healthy':
        return { 
          text: 'Backend OK', 
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: CheckCircle
        };
      case 'unhealthy':
        return { 
          text: 'Backend Issue', 
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: XCircle
        };
      default:
        return { 
          text: 'Checking...', 
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: AlertCircle
        };
    }
  };

  const statusDisplay = health ? getStatusDisplay(health.status) : getStatusDisplay('unknown');
  const StatusIcon = statusDisplay.icon;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {recentCases.length > 0 && (
          <span className="ml-4 text-sm text-gray-500">
            {recentCases.length} case{recentCases.length !== 1 ? 's' : ''} total
          </span>
        )}
      </div>
      
      {/* Non-clickable Status Indicator */}
      <div className="flex items-center gap-2 px-3 py-1">
        <StatusIcon className="h-4 w-4" />
        <Badge 
          variant="outline" 
          className={`${statusDisplay.color} text-xs`}
        >
          {statusDisplay.text}
        </Badge>
      </div>
    </div>
  );
};

export default DashboardHeader;
