
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const RiskAssessmentWidget = ({ isComparison = false, caseData = null }) => {
  
  // Mock data for the key factors
  const factors = [
    { factor: 'Prior similar rulings by Judge Chen', impact: 'Very High', direction: 'In Favor' },
    { factor: 'Precedent in Thompson v. Allied Corp', impact: 'High', direction: 'In Favor' },
    { factor: 'Statutory time limitations', impact: 'Medium', direction: 'Against' },
    { factor: 'Inconsistent witness statements', impact: 'High', direction: 'Against' },
    { factor: 'Recent appellate court decision', impact: 'Medium', direction: 'In Favor' }
  ];

  const renderRiskAssessment = (caseData: any, className = '') => {
    return (
      <div className={`space-y-3 ${className}`}>
        <h4 className="text-sm font-medium">Top 5 Influencing Factors</h4>
        <div className="space-y-2">
          {factors.map((item, index) => (
            <div key={index} className="flex justify-between p-2 bg-gray-50 rounded-md">
              <div className="text-sm">{item.factor}</div>
              <div className={`text-sm font-medium flex items-center ${
                item.direction === 'In Favor' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.direction === 'In Favor' ? (
                  <CheckCircle size={14} className="mr-1" />
                ) : (
                  <XCircle size={14} className="mr-1" />
                )}
                {item.impact} ({item.direction})
              </div>
            </div>
          ))}
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
            {renderRiskAssessment(caseData)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case B</h4>
            {renderRiskAssessment(caseData)}
          </div>
        </div>
      ) : (
        renderRiskAssessment(caseData)
      )}
    </div>
  );
};

export default RiskAssessmentWidget;
