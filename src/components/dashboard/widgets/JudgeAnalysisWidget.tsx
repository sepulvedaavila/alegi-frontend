
import { Scale, UserCog, CheckCircle, AlertTriangle, Gavel, BookOpen, TrendingUp, BarChart3 } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const JudgeAnalysisWidget = ({ isComparison = false }) => {
  const { selectedCase, comparisonCase } = useDashboard();

  const renderAnalysis = (caseData: any, className = '') => {
    return (
      <div className={`space-y-4 ${className}`}>
        <h4 className="text-sm font-medium">Judge & Court Trends</h4>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserCog className="mr-2 text-alegi-blue" size={18} />
                <span className="font-medium text-sm">Judge Maria Rodriguez</span>
              </div>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Similar cases ruled:</span>
                <span>42</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Plaintiff favor rate:</span>
                <span className="text-green-600 font-medium">68%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Avg. settlement amount:</span>
                <span>$820,000</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Gavel className="mr-2 text-alegi-blue" size={18} />
                <span className="font-medium text-sm">Northern District Court</span>
              </div>
              <BarChart3 size={16} className="text-blue-500" />
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Medical Negligence Cases:</span>
                <span>124 cases</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Plaintiff Win Rate:</span>
                <span className="text-green-600 font-medium">62%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Avg. Case Duration:</span>
                <span>9.5 months</span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Judge Rodriguez has historically favored plaintiffs in medical negligence cases with strong expert testimony. This court tends to process cases efficiently compared to national average.</p>
          </div>
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

export default JudgeAnalysisWidget;
