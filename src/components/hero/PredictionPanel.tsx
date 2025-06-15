
import { PieChart, DollarSign, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

const PredictionPanel = () => {
  return (
    <div className="col-span-1">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Outcome Prediction</h3>
      <div className="h-32 bg-gradient-to-r from-alegi-blue/10 to-indigo-100/50 rounded-lg flex items-center justify-center mb-4">
        <div className="text-center">
          <div className="text-green-600 font-bold mb-2">Favorable Outcome</div>
          <div className="inline-block px-3 py-1 bg-alegi-blue text-white text-sm rounded-full">
            <PieChart className="h-3.5 w-3.5 inline-block mr-1" />
            78% Confidence
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-green-50 rounded-lg border border-green-100 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-medium text-green-800">Estimated Financial Outcome</h4>
          <DollarSign className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-base font-bold text-green-700">$825,000</div>
        <div className="text-xs mt-1 text-green-600">Range: $720,000 - $940,000</div>
      </div>
      
      <div className="border border-gray-100 rounded-lg p-3 mb-4">
        <h4 className="text-xs font-medium text-gray-700 mb-2">Prediction Breakdown</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span>Favorable Liability Finding</span>
            </span>
            <span className="font-medium text-green-600">82%</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span>Successful Settlement</span>
            </span>
            <span className="font-medium text-green-600">75%</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center">
              <XCircle className="h-3 w-3 text-red-500 mr-1" />
              <span>Appeal After Trial</span>
            </span>
            <span className="font-medium text-red-600">32%</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Precedent Cases</span>
            <span className="text-xs font-medium">754,889</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div className="w-1/3 h-2 bg-alegi-blue rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Similar Rulings</span>
            <span className="text-xs font-medium">342,891</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div className="w-1/4 h-2 bg-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPanel;
