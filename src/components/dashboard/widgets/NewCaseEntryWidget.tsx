
import { useState } from 'react';
import { FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NewCaseModal from '@/components/cases/NewCaseModal';

const NewCaseEntryWidget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  
  const handleNewCase = () => {
    if (user) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <FilePlus2 className="text-alegi-blue mb-2" size={24} />
        <h3 className="text-sm font-medium">New Case Entry</h3>
        <p className="text-xs text-gray-500 mt-1">Enter case details for AI analysis</p>
        <div className="flex flex-col gap-2 mt-3 w-full">
          <Button 
            className="bg-alegi-blue text-white text-xs px-4 py-2 rounded"
            onClick={handleNewCase}
            disabled={!user}
          >
            New Case
          </Button>
        </div>
        {!user && (
          <p className="text-xs text-red-500 mt-2">Please sign in to create a case</p>
        )}
      </div>

      <NewCaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default NewCaseEntryWidget;
