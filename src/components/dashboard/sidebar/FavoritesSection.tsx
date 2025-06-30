import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';

const FavoritesSection = () => {
  const { favoriteCases, selectCase, selectedCase } = useDashboard();
  const navigate = useNavigate();

  const handleCaseClick = (caseId: string) => {
    selectCase(caseId);
    navigate(`/dashboard/case/${caseId}`);
  };

  return (
    <>
      <div className="text-xs font-medium text-gray-500 mt-4 mb-1">FAVORITES</div>
      {favoriteCases.length === 0 ? (
        <div className="text-xs text-gray-400 italic py-1">No favorite cases yet</div>
      ) : (
        favoriteCases.map(favorite => (
          <div 
            key={favorite.id}
            className={cn(
              "flex items-center py-1 text-sm cursor-pointer hover:bg-gray-100 rounded px-2 transition-colors",
              selectedCase?.id === favorite.id ? "text-alegi-blue font-medium bg-blue-50" : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => handleCaseClick(favorite.id)}
          >
            <Star size={14} className="mr-2 text-yellow-400 fill-yellow-400" />
            <span className="truncate">{favorite.title}</span>
          </div>
        ))
      )}
    </>
  );
};

export default FavoritesSection;
