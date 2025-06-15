
import { Building2, TrendingUp, ArrowRight, BarChart3 } from 'lucide-react';
import React from 'react';

const JudgeTrends = () => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="h-4 w-4 text-alegi-blue" />
        <h3 className="text-sm font-medium text-gray-700">Judge & Court Trends</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-medium text-gray-700">Judge Matthews - Historical Rulings</h4>
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Plaintiff Favorable</span>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-gray-200 rounded-full mr-2">
                  <div className="w-16 h-1.5 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-medium">68%</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Defendant Favorable</span>
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-gray-200 rounded-full mr-2">
                  <div className="w-8 h-1.5 bg-red-500 rounded-full"></div>
                </div>
                <span className="font-medium">32%</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Average Settlement</span>
              <span className="font-medium">$785,400</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-medium text-gray-700">Northern District Court - Last 24 Months</h4>
            <BarChart3 className="h-3.5 w-3.5 text-alegi-blue" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Medical Negligence Cases</span>
              <span className="font-medium">124 cases</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Plaintiff Win Rate</span>
              <span className="font-medium text-green-600">62%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Avg. Case Duration</span>
              <span className="font-medium">9.5 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeTrends;
