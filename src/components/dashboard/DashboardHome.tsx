
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import DashboardHeader from './header/DashboardHeader';
import ExportMenu from './header/ExportMenu';
import DashboardContent from './content/DashboardContent';
import NewCaseModal from '@/components/cases/NewCaseModal';
import { useDashboard } from '@/contexts/DashboardContext';

const DashboardHome = () => {
  const { selectedCase, toggleFavorite, isFavorite } = useDashboard();
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (selectedCase) {
      toggleFavorite(selectedCase.id);
    }
  };

  // Open the new case modal
  const handleNewCase = () => {
    setIsNewCaseModalOpen(true);
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="py-6">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <DashboardHeader 
              isFavorite={selectedCase ? isFavorite(selectedCase.id) : false} 
              onFavoriteToggle={handleFavoriteToggle} 
            />
            <div className="flex items-center gap-3">
              <Button
                onClick={handleNewCase}
                className="bg-alegi-blue hover:bg-blue-700 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Case
              </Button>
              <ExportMenu dashboardRef={dashboardRef} />
            </div>
          </div>
        </div>
        
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <DashboardContent dashboardRef={dashboardRef} />
          </div>
        </div>
      </div>

      <NewCaseModal 
        isOpen={isNewCaseModalOpen} 
        onClose={() => setIsNewCaseModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardHome;
