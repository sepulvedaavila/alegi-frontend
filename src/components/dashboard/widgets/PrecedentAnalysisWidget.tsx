
import { Scale, FileText, Info, BarChart3 } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const PrecedentAnalysisWidget = ({ isComparison = false }) => {
  const { selectedCase, comparisonCase } = useDashboard();
  
  // Mock data for similar cases
  const similarCases = [
    { title: 'Johnson v. MedTech Inc.', similarity: '87%', outcome: 'Won', amount: '$1.2M' },
    { title: 'Peterson Healthcare Trust', similarity: '82%', outcome: 'Settled', amount: '$850K' },
    { title: 'Williams Medical Group', similarity: '78%', outcome: 'Lost', amount: '$0' },
    { title: 'Roberts v. City Hospital', similarity: '75%', outcome: 'Won', amount: '$2.1M' }
  ];

  const renderPrecedentAnalysis = (caseData: any, className = '') => {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium flex items-center">
            <FileText className="mr-2 text-alegi-blue" size={18} />
            Precedent Case Analysis
          </h4>
          <div className="flex items-center text-xs text-gray-500">
            <BarChart3 size={14} className="mr-1" />
            264 cases analyzed
          </div>
        </div>
        
        <div className="p-3 border rounded-lg bg-blue-50">
          <h5 className="text-sm font-medium text-blue-800 mb-2">Key Precedent Insights</h5>
          <ul className="space-y-1 text-xs text-blue-900">
            <li className="flex items-start">
              <Info size={12} className="mr-1 mt-0.5 text-blue-700" />
              <span>78% of similar cases resulted in positive outcomes for plaintiffs</span>
            </li>
            <li className="flex items-start">
              <Info size={12} className="mr-1 mt-0.5 text-blue-700" />
              <span>Average settlement amount in comparable cases: $925,000</span>
            </li>
            <li className="flex items-start">
              <Info size={12} className="mr-1 mt-0.5 text-blue-700" />
              <span>Most cited precedent: Thompson v. Allied Corp (2019)</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          {similarCases.map((caseItem, idx) => (
            <div key={idx} className="flex p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="mr-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  caseItem.outcome === 'Won' ? 'bg-green-100 text-green-600' : 
                  caseItem.outcome === 'Lost' ? 'bg-red-100 text-red-600' : 
                  'bg-amber-100 text-amber-600'
                }`}>
                  <Scale size={18} />
                </div>
              </div>
              <div className="flex-grow">
                <h5 className="text-sm font-medium">{caseItem.title}</h5>
                <div className="flex text-xs text-gray-500 mt-1">
                  <span className="mr-3">Similarity: {caseItem.similarity}</span>
                  <span className="mr-3">Outcome: {caseItem.outcome}</span>
                  <span>Settlement: {caseItem.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500">
          <p>The precedent analysis shows strong similarities to cases that were successfully settled or won at trial, particularly in cases involving similar medical procedures and expert testimony.</p>
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
            {renderPrecedentAnalysis(selectedCase)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">{comparisonCase.title}</h4>
            {renderPrecedentAnalysis(comparisonCase)}
          </div>
        </div>
      ) : (
        renderPrecedentAnalysis(selectedCase)
      )}
    </div>
  );
};

export default PrecedentAnalysisWidget;
