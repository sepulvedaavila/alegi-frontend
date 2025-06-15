
import { Scale, TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const SettlementVsTrialAnalysisWidget = ({ isComparison = false }) => {
  const { selectedCase, comparisonCase } = useDashboard();

  const renderAnalysis = (caseData: any, className = '') => {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center">
          <Scale className="text-alegi-blue mr-2" size={18} />
          <h4 className="text-sm font-medium">Settlement vs Trial Analysis</h4>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
            <h5 className="text-sm font-medium text-blue-700 mb-2">Settlement</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>Likelihood:</span>
                <span className="font-medium text-blue-700">64%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Est. Amount:</span>
                <span className="font-medium text-blue-700">$820,000</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Time to Resolution:</span>
                <span className="font-medium text-blue-700">14.2 months</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Legal Costs:</span>
                <span className="font-medium text-blue-700">$110,000</span>
              </div>
            </div>
            <div className="mt-3 text-xs flex items-center text-blue-700">
              <TrendingUp size={14} className="mr-1" />
              Recommended option
            </div>
          </div>
          
          <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Trial</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>Win Likelihood:</span>
                <span className="font-medium text-gray-700">52%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Est. Award:</span>
                <span className="font-medium text-gray-700">$950,000</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Time to Resolution:</span>
                <span className="font-medium text-gray-700">23.8 months</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Legal Costs:</span>
                <span className="font-medium text-gray-700">$210,000</span>
              </div>
            </div>
            <div className="mt-3 text-xs flex items-center text-gray-500">
              <TrendingDown size={14} className="mr-1" />
              Higher risk option
            </div>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg">
          <h5 className="text-xs font-medium mb-2">Key Settlement Factors</h5>
          <ul className="space-y-1 text-xs">
            <li className="flex items-start">
              <DollarSign size={12} className="text-green-500 mr-1 mt-0.5" />
              <span>Defendant has settled 8 similar cases in the past 3 years</span>
            </li>
            <li className="flex items-start">
              <Clock size={12} className="text-amber-500 mr-1 mt-0.5" />
              <span>Trial calendar for this jurisdiction shows 18+ month backlog</span>
            </li>
            <li className="flex items-start">
              <Scale size={12} className="text-blue-500 mr-1 mt-0.5" />
              <span>Recent jury verdicts have been unpredictable for this case type</span>
            </li>
          </ul>
        </div>
        
        <div className="text-xs text-gray-500">
          <p>Based on settlement patterns in 142 similar cases and trial outcomes in 68 related verdicts</p>
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
            {renderAnalysis(selectedCase)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">{comparisonCase.title}</h4>
            {renderAnalysis(comparisonCase)}
          </div>
        </div>
      ) : (
        renderAnalysis(selectedCase)
      )}
    </div>
  );
};

export default SettlementVsTrialAnalysisWidget;
