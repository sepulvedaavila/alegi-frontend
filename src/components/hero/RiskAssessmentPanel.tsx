
import { AlertTriangle, Percent, Shield, CheckCircle } from 'lucide-react';
import React from 'react';

const RiskAssessmentPanel = () => {
  return (
    <div className="col-span-1 border border-gray-100 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4">
        <AlertTriangle className="h-4 w-4 inline-block mr-1 text-amber-500" />
        Risk Assessment
      </h3>
      <div className="space-y-3 mb-4">
        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
          <span className="text-xs font-medium text-red-700">High Risk: Evidence quality strength</span>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
          <span className="text-xs font-medium text-amber-700">Medium Risk: Missing Expert Opinion</span>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
          <span className="text-xs font-medium text-green-700">Low Risk: Strong factual support</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Percent className="h-4 w-4 text-alegi-blue" />
          <h4 className="text-xs font-medium text-gray-700">Fact Strength Analysis</h4>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Medical Expert Testimony</span>
              <span className="text-xs font-medium text-green-600">87%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="w-[87%] h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Documentary Evidence</span>
              <span className="text-xs font-medium text-green-600">92%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="w-[92%] h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Witness Credibility</span>
              <span className="text-xs font-medium text-amber-600">64%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="w-[64%] h-2 bg-amber-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentPanel;
