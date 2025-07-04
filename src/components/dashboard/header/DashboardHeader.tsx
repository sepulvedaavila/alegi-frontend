import { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import BackendStatusIndicator from '../BackendStatusIndicator';

interface DashboardHeaderProps {
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

const DashboardHeader = ({ onFavoriteToggle, isFavorite }: DashboardHeaderProps) => {
  const { recentCases } = useDashboard();

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
      <BackendStatusIndicator showDetails={false} className="w-64" />
    </div>
  );
};

export default DashboardHeader;
