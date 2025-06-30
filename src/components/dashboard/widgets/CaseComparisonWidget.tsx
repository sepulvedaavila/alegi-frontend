import { useState } from 'react';
import { Scale, ChevronDown, CheckSquare, Plus } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CaseComparisonWidget = () => {
  const { recentCases, selectedCase, selectComparisonCase, comparisonCase, isLoadingCases } = useDashboard();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  // Filter out the currently selected case from comparison options
  const comparisonOptions = recentCases.filter(c => !selectedCase || c.id !== selectedCase.id);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleSelectCase = (caseId: string) => {
    selectComparisonCase(caseId);
    setDropdownOpen(false);
  };
  
  const handleClearComparison = () => {
    selectComparisonCase(null);
  };

  if (isLoadingCases) {
    return (
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-alegi-blue mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Loading cases...</p>
      </div>
    );
  }

  if (recentCases.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed rounded-md">
        <Scale size={24} className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-4">No cases available for comparison</p>
        <Button 
          onClick={() => navigate('/dashboard/new-case')}
          className="bg-alegi-blue text-white hover:bg-alegi-blue/90"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create First Case
        </Button>
      </div>
    );
  }

  if (!selectedCase) {
    return (
      <div className="text-center p-6 border border-dashed rounded-md">
        <Scale size={24} className="mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">Please select a case first</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Scale className="text-alegi-blue mr-2" size={18} />
          <h4 className="text-sm font-medium">Case Comparison</h4>
        </div>
        {comparisonCase && (
          <button 
            onClick={handleClearComparison}
            className="text-xs text-red-600 hover:underline"
          >
            Clear Comparison
          </button>
        )}
      </div>
      
      {selectedCase ? (
        <div className="space-y-3">
          <div className="p-3 border rounded-md">
            <h5 className="text-xs font-medium">Current Case</h5>
            <div className="mt-1 text-sm">{selectedCase.title}</div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{selectedCase.id}</span>
              <span>{selectedCase.status}</span>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full p-3 border rounded-md flex justify-between items-center"
            >
              <div>
                <h5 className="text-xs font-medium">Case to Compare</h5>
                <div className="mt-1 text-sm">
                  {comparisonCase ? comparisonCase.title : 'Select a case to compare'}
                </div>
              </div>
              <ChevronDown size={16} className={dropdownOpen ? "transform rotate-180" : ""} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                {comparisonOptions.length > 0 ? (
                  comparisonOptions.map(caseItem => (
                    <div
                      key={caseItem.id}
                      className="p-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                      onClick={() => handleSelectCase(caseItem.id)}
                    >
                      <div>
                        <div className="text-sm">{caseItem.title}</div>
                        <div className="text-xs text-gray-500">{caseItem.id}</div>
                      </div>
                      {comparisonCase && comparisonCase.id === caseItem.id && (
                        <CheckSquare size={16} className="text-alegi-blue" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-500">No other cases available</div>
                )}
              </div>
            )}
          </div>
          
          {!comparisonCase ? (
            <div className="text-center p-6 border border-dashed rounded-md">
              <Scale size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Select a case above to begin comparison</p>
            </div>
          ) : (
            <div className="p-3 border rounded-md bg-blue-50">
              <h5 className="text-xs font-medium text-blue-800">Comparison Summary</h5>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Confidence Score Difference:</span>
                  <span className="font-medium">
                    {Math.abs(selectedCase.confidence - comparisonCase.confidence)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Profile:</span>
                  <span className={`font-medium ${
                    selectedCase.risk === comparisonCase.risk ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {selectedCase.risk === comparisonCase.risk ? 'Similar' : 'Different'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Case Age Difference:</span>
                  <span className="font-medium">
                    {Math.abs(
                      new Date(selectedCase.date).getTime() - 
                      new Date(comparisonCase.date).getTime()
                    ) / (1000 * 60 * 60 * 24)} days
                  </span>
                </div>
              </div>
              
              <button className="w-full mt-3 bg-alegi-blue text-white text-xs py-2 rounded">
                View Detailed Comparison
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed rounded-md">
          <Scale size={24} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">Please select a case first</p>
        </div>
      )}
    </div>
  );
};

export default CaseComparisonWidget;
