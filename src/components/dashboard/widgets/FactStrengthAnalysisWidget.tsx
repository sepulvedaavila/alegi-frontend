
import { useState } from 'react';
import { Check, CheckCheck, Shield, AlertCircle, Eye } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useDashboard } from '@/contexts/DashboardContext';

const FactStrengthAnalysisWidget = () => {
  const { selectedCase } = useDashboard();
  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const [evidenceItems] = useState([
    { id: 1, name: 'Medical Expert Testimony', strength: 85, impact: 'High', type: 'Expert' },
    { id: 2, name: 'Supporting Witness Statement', strength: 72, impact: 'Medium', type: 'Witness' },
    { id: 3, name: 'Documentary Evidence', strength: 91, impact: 'High', type: 'Document' },
    { id: 4, name: 'Prior Incident Reports', strength: 68, impact: 'Medium', type: 'Document' },
    { id: 5, name: 'Timeline Analysis', strength: 77, impact: 'Medium', type: 'Analysis' },
    { id: 6, name: 'Plaintiff Deposition', strength: 82, impact: 'High', type: 'Testimony' },
    { id: 7, name: 'Police Report', strength: 65, impact: 'Medium', type: 'Document' },
    { id: 8, name: 'Similar Case Precedent', strength: 79, impact: 'High', type: 'Precedent' },
    { id: 9, name: 'Opposing Expert Analysis', strength: 45, impact: 'Medium', type: 'Expert' },
    { id: 10, name: 'Statistical Evidence', strength: 83, impact: 'Medium', type: 'Analysis' },
  ]);

  const overallStrength = Math.round(
    evidenceItems.reduce((sum, item) => sum + item.strength, 0) / evidenceItems.length
  );

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'bg-green-500';
    if (strength >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStrengthIcon = (strength: number) => {
    if (strength >= 80) return <CheckCheck size={16} className="text-green-600" />;
    if (strength >= 60) return <Check size={16} className="text-yellow-600" />;
    return <AlertCircle size={16} className="text-red-600" />;
  };

  if (!selectedCase) {
    return <div className="text-center py-4">No case selected</div>;
  }

  // Display all evidence items if showAllEvidence is true, otherwise only show the first 5
  const displayedEvidenceItems = showAllEvidence ? evidenceItems : evidenceItems.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">Overall Evidence Strength</h4>
          <p className="text-2xl font-bold text-alegi-blue">{overallStrength}%</p>
        </div>
        <Shield className={overallStrength >= 80 ? 'text-green-500' : overallStrength >= 60 ? 'text-yellow-500' : 'text-red-500'} size={36} />
      </div>

      <div className="border rounded-lg p-3">
        <h5 className="text-sm font-medium border-b pb-2 mb-3">Evidence and Argument Analysis</h5>
        <div className="space-y-3">
          {displayedEvidenceItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getStrengthIcon(item.strength)}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.type}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.impact}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={item.strength} 
                  className="h-2 flex-grow" 
                  indicatorClassName={getStrengthColor(item.strength)} 
                />
                <span className="text-xs font-medium">{item.strength}%</span>
              </div>
            </div>
          ))}
          
          {/* View All Link */}
          {evidenceItems.length > 5 && (
            <button 
              onClick={() => setShowAllEvidence(!showAllEvidence)} 
              className="text-alegi-blue hover:text-alegi-blue-dark text-xs font-medium flex items-center mt-2"
            >
              <Eye size={12} className="mr-1" />
              {showAllEvidence ? "Show Less" : "View All Evidence"}
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <p>Analysis based on {evidenceItems.length} key evidence items</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default FactStrengthAnalysisWidget;
