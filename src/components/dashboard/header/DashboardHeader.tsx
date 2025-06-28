
import { useState } from 'react';
import { Star } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

const DashboardHeader = ({ onFavoriteToggle, isFavorite }: DashboardHeaderProps) => {
  const { selectedCase, recentCases, selectCase } = useDashboard();

  const toggleFavorite = () => {
    onFavoriteToggle();
    toast.success(!isFavorite ? "Added to favorites" : "Removed from favorites");
  };

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-500 mr-2">Current Case:</span>
      <select 
        className="font-medium text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
        value={selectedCase?.id || ''}
        onChange={(e) => selectCase(e.target.value)}
      >
        {recentCases.map(caseItem => (
          <option key={caseItem.id} value={caseItem.id}>
            {caseItem.title}
          </option>
        ))}
      </select>
      <button 
        onClick={toggleFavorite} 
        className="ml-2 p-1 focus:outline-none" 
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star 
          size={18} 
          className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-gray-600"} 
        />
      </button>
    </div>
  );
};

export default DashboardHeader;
