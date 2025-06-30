import { FileText, Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';
import FavoritesSection from './FavoritesSection';

const CasesDropdown = () => {
  const { recentCases, selectedCase, selectCase, isLoadingCases } = useDashboard();
  const navigate = useNavigate();

  const handleCaseClick = (caseId: string) => {
    selectCase(caseId);
    navigate(`/dashboard/case/${caseId}`);
  };

  if (isLoadingCases) {
    return (
      <div className="pl-10 space-y-1">
        <div className="text-xs font-medium text-gray-500 mt-3 mb-1">RECENT CASES</div>
        <div className="flex items-center py-1 text-sm text-gray-600">
          <Loader2 size={14} className="mr-2 animate-spin" />
          <span>Loading cases...</span>
        </div>
      </div>
    );
  }

  if (recentCases.length === 0) {
    return (
      <div className="pl-10 space-y-1">
        <div className="text-xs font-medium text-gray-500 mt-3 mb-1">RECENT CASES</div>
        <div className="py-1 text-sm text-gray-500">
          No cases found. Create your first case to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="pl-10 space-y-1">
      {/* Recent Cases List */}
      <div className="text-xs font-medium text-gray-500 mt-3 mb-1">RECENT CASES</div>
      {recentCases.map(caseItem => (
        <div 
          key={caseItem.id}
          className={cn(
            "flex items-center py-1 text-sm cursor-pointer hover:bg-gray-100 rounded px-2 transition-colors",
            selectedCase?.id === caseItem.id ? "text-alegi-blue font-medium bg-blue-50" : "text-gray-600 hover:text-gray-900"
          )}
          onClick={() => handleCaseClick(caseItem.id)}
        >
          <FileText size={14} className="mr-2" />
          <span className="truncate">{caseItem.title}</span>
        </div>
      ))}
      
      {/* Favorites Section */}
      <FavoritesSection />
    </div>
  );
};

export default CasesDropdown;
