import { AlertTriangle, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CaseComplexityRiskWidgetProps {
  caseId?: string;
  isComparison?: boolean;
  caseData?: any;
}

const CaseComplexityRiskWidget = ({ caseId, isComparison = false, caseData = null }: CaseComplexityRiskWidgetProps) => {

  const renderRiskScore = (caseData: any, className = '') => {
    // Mock data - would come from API in real application
    const riskData = {
      score: 7.2,
      level: 'High',
      factors: [
        { name: 'Legal Complexity', score: 8.5, weight: 30 },
        { name: 'Evidence Strength', score: 6.8, weight: 25 },
        { name: 'Financial Exposure', score: 7.9, weight: 20 },
        { name: 'Procedural Risk', score: 5.4, weight: 15 },
        { name: 'Timeline Pressure', score: 6.2, weight: 10 }
      ]
    };

    const getRiskColor = (score: number) => {
      if (score >= 7) return 'text-red-600 bg-red-100';
      if (score >= 5) return 'text-yellow-600 bg-yellow-100';
      return 'text-green-600 bg-green-100';
    };

    const getRiskLevel = (score: number) => {
      if (score >= 7) return 'High';
      if (score >= 5) return 'Medium';
      return 'Low';
    };

    const getRiskIcon = (score: number) => {
      if (score >= 7) return <AlertTriangle size={20} className="text-red-600" />;
      if (score >= 5) return <TrendingUp size={20} className="text-yellow-600" />;
      return <Shield size={20} className="text-green-600" />;
    };

    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">Case Complexity & Risk Score</h4>
            <div className="flex items-center space-x-3 mt-1">
              <div className="text-3xl font-bold text-alegi-blue">{riskData.score}/10</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskData.score)}`}>
                {getRiskLevel(riskData.score)} Risk
              </div>
            </div>
          </div>
          {getRiskIcon(riskData.score)}
        </div>

        <div className="border rounded-lg p-3">
          <h5 className="text-sm font-medium border-b pb-2 mb-3">Risk Factor Breakdown</h5>
          <div className="space-y-3">
            {riskData.factors.map((factor, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{factor.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {factor.weight}%
                    </span>
                    <span className="text-sm font-medium">{factor.score}/10</span>
                  </div>
                </div>
                <Progress 
                  value={factor.score * 10} 
                  className="h-2" 
                  indicatorClassName={
                    factor.score >= 7 ? 'bg-red-500' : 
                    factor.score >= 5 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium mb-2">Risk Assessment Summary</h5>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• This case presents {getRiskLevel(riskData.score).toLowerCase()} complexity due to multiple factors</p>
            <p>• Legal complexity and financial exposure are primary concerns</p>
            <p>• Evidence strength is moderate, providing some balance</p>
            <p>• Recommended: Enhanced monitoring and expert consultation</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 size={12} className="mr-1" />
            <span>Based on 156 similar cases</span>
          </div>
          <span>Last updated: Today</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isComparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r pr-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case A</h4>
            {renderRiskScore(caseData)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case B</h4>
            {renderRiskScore(caseData)}
          </div>
        </div>
      ) : (
        renderRiskScore(caseData)
      )}
    </div>
  );
};

export default CaseComplexityRiskWidget; 