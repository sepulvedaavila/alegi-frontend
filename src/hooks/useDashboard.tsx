
import { useContext } from 'react';
import { DashboardContext } from '@/contexts/DashboardContext';
import { DashboardContextType } from '@/types/dashboard';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context as DashboardContextType;
};
