
import { DollarSign, Scale, Clock, TrendingUp } from 'lucide-react';
import React from 'react';

const FeatureMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-alegi-blue/10 p-2 rounded-lg">
          <DollarSign className="h-5 w-5 text-alegi-blue" />
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-700">Est. Litigation Cost</h4>
          <p className="text-sm font-bold">$25,000 - $32,000</p>
          <p className="text-xs text-gray-500 mt-0.5">Based on similar cases</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-alegi-blue/10 p-2 rounded-lg">
          <Scale className="h-5 w-5 text-alegi-blue" />
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-700">Settlement Analysis</h4>
          <p className="text-sm font-bold">Recommended (67%)</p>
          <p className="text-xs text-gray-500 mt-0.5">Pre-trial negotiation advised</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-alegi-blue/10 p-2 rounded-lg">
          <Clock className="h-5 w-5 text-alegi-blue" />
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-700">Est. Time to Resolution</h4>
          <p className="text-sm font-bold">9-12 months</p>
          <p className="text-xs text-gray-500 mt-0.5">Faster than average (14 mo.)</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureMetrics;
