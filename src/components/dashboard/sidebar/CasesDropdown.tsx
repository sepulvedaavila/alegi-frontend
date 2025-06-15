
import { FileText, Star } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';
import FavoritesSection from './FavoritesSection';

const CasesDropdown = () => {
  const { recentCases, selectedCase, selectCase } = useDashboard();

  return (
    <div className="pl-10 space-y-1">
      {/* Recent Cases List */}
      <div className="text-xs font-medium text-gray-500 mt-3 mb-1">RECENT CASES</div>
      {recentCases.map(caseItem => (
        <div 
          key={caseItem.id}
          className={cn(
            "flex items-center py-1 text-sm cursor-pointer",
            selectedCase?.id === caseItem.id ? "text-alegi-blue font-medium" : "text-gray-600 hover:text-gray-900"
          )}
          onClick={() => selectCase(caseItem.id)}
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
