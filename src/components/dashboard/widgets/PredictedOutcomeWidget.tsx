
import { ArrowDown, ArrowUp, Scale, DollarSign, Briefcase, Clock } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const PredictedOutcomeWidget = ({ isComparison = false }) => {
  const { selectedCase, comparisonCase } = useDashboard();
  
  const renderCasePrediction = (caseItem: any, className = '') => {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-medium text-blue-700">Outcome Prediction Score</h5>
              <Scale className="text-blue-500" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-600">Favorable</div>
              <div className="text-xs text-blue-600 flex items-center mt-1">
                <ArrowUp className="mr-1" size={12} />
                82% confidence
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-medium text-green-700">Estimated Financial Outcome</h5>
              <DollarSign className="text-green-500" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-700">$850,000</div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <span className="text-gray-500 mr-1">Range:</span>
                $720K - $950K
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-amber-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h5 className="text-xs font-medium text-amber-700">Litigation Cost Estimate</h5>
            <Clock className="text-amber-500" size={16} />
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-amber-700">$180,000</div>
            <div className="text-xs text-amber-600 flex items-center mt-1">
              <span className="text-gray-500 mr-1">Range:</span>
              $150K - $210K
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-3">
          <h5 className="text-xs font-medium border-b pb-2">Prediction Breakdown</h5>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Liability Finding</span>
              <span className="text-xs font-medium text-green-600">78% likely</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Trial Success (if no settlement)</span>
              <span className="text-xs font-medium text-amber-600">52% likely</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Appeal After Trial</span>
              <span className="text-xs font-medium text-red-600">31% likely</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <div className="flex items-center">
            <Briefcase size={12} className="mr-1" />
            <span>Based on 184 similar cases in our database</span>
          </div>
          <div className="mt-1">Last updated: Today at 9:45 AM</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isComparison && comparisonCase ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r pr-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">{selectedCase?.title}</h4>
            {renderCasePrediction(selectedCase)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">{comparisonCase.title}</h4>
            {renderCasePrediction(comparisonCase)}
          </div>
        </div>
      ) : (
        renderCasePrediction(selectedCase)
      )}
    </div>
  );
};

export default PredictedOutcomeWidget;
