
import React from 'react';
import { Database, Lightbulb, CheckCircle, XCircle } from 'lucide-react';

const CaseAnalysisPanel = () => {
  return (
    <div className="col-span-1 border border-gray-100 rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Case Analysis</h3>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-3.5 w-3.5 text-alegi-blue" />
          <h4 className="text-xs font-medium text-gray-700">Similar Past Cases</h4>
        </div>
        <div className="space-y-2">
          <div className="bg-white rounded-md p-2 text-xs border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Matthews v. Central Medical</span>
              <span className="text-green-600 font-medium">Won</span>
            </div>
            <div className="text-gray-500">Judgment: $920,000</div>
          </div>
          <div className="bg-white rounded-md p-2 text-xs border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Reynolds v. Regional Healthcare Trust</span>
              <span className="text-amber-600 font-medium">Settled</span>
            </div>
            <div className="text-gray-500">Settlement: $780,000</div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <h4 className="text-xs font-medium text-gray-700">AI Strategy Recommendations</h4>
        </div>
        <div className="bg-amber-50 rounded-md p-2 text-xs border border-amber-100">
          <p className="text-amber-800 mb-1">Primary recommendation: Early settlement negotiation</p>
          <p className="text-amber-700">Focus on expert testimony strength and procedural timeline to maximize outcome.</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-alegi-blue flex items-center justify-center text-white text-xs">
          AI
        </div>
        <div className="ml-3">
          <p className="text-xs text-gray-700">Analysis based on 347 similar cases</p>
          <p className="text-xs text-gray-500">Last updated: Today at 10:25 AM</p>
        </div>
      </div>
    </div>
  );
};

export default CaseAnalysisPanel;
