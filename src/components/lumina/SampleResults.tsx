
import React from 'react';
import { BadgeCheck, ArrowRight } from 'lucide-react';

const SampleResults: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See What You'll Discover About Your Case
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Case Assessment Report</h3>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Outcome Prediction</h4>
                  <p className="text-green-600 font-medium flex items-center">
                    <BadgeCheck size={20} className="mr-2" />
                    Favorable Outcome
                  </p>
                  <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-1/3 text-center border-r border-blue-100">
                        <div className="text-sm text-gray-500">Win</div>
                        <div className="text-2xl font-bold text-green-600">88%</div>
                      </div>
                      <div className="w-1/3 text-center border-r border-blue-100">
                        <div className="text-sm text-gray-500">Settle</div>
                        <div className="text-2xl font-bold text-blue-600">76%</div>
                      </div>
                      <div className="w-1/3 text-center">
                        <div className="text-sm text-gray-500">Dismiss</div>
                        <div className="text-2xl font-bold text-blue-600">11%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">Case Strength Score</h4>
                  <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>0%</span>
                    <span className="font-medium">88%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Financial Projection</h4>
                  <p className="text-gray-800 font-medium">Potential recovery: $8,000-$12,000</p>
                  <div className="mt-3">
                    <div className="h-28 flex items-end">
                      <div className="w-1/5 h-20 bg-blue-200 rounded-t-md mx-1"></div>
                      <div className="w-1/5 h-24 bg-blue-400 rounded-t-md mx-1"></div>
                      <div className="w-1/5 h-28 bg-blue-600 rounded-t-md mx-1"></div>
                      <div className="w-1/5 h-16 bg-blue-400 rounded-t-md mx-1"></div>
                      <div className="w-1/5 h-14 bg-blue-200 rounded-t-md mx-1"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$5k</span>
                      <span>$7.5k</span>
                      <span>$10k</span>
                      <span>$12.5k</span>
                      <span>$15k</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Related Case Law</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-gray-800">Cal. Lab. Code § 1102.5</p>
                    <p className="text-gray-800">Cal. Gov't Code § 12940</p>
                    <p className="text-gray-800">Cal. Civ. Code § 51 (FEHA)</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-700 mb-3">Risk Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Evidence Strength</span>
                      <div className="flex items-center">
                        <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-sm text-gray-700">High</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Procedural Complexity</span>
                      <div className="flex items-center">
                        <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
                        <span className="text-sm text-gray-700">Medium</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Opposition Strength</span>
                      <div className="flex items-center">
                        <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-sm text-gray-700">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Time Estimate</h4>
                  <p className="text-gray-800 font-medium">Estimated resolution time: 9-12 months</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Recommendation</h4>
                  <div className="space-y-2">
                    <p className="text-gray-800 font-medium">Consider pursuing with settlement as primary goal</p>
                    <div className="bg-blue-50 p-2 rounded text-blue-800 text-sm">
                      <ArrowRight size={16} className="inline-block mr-1" /> File motion to exclude unreliable witness testimony
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-blue-800 text-sm">
                      <ArrowRight size={16} className="inline-block mr-1" /> Submit a Discovery request for additional witnesses
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Recommended Lawyers</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 border rounded">
                      <p className="font-medium">Sarah Johnson, Esq.</p>
                      <p className="text-gray-600">Employment Law Specialist</p>
                      <p className="text-blue-600">contact@johnsonlaw.com</p>
                    </div>
                    <div className="p-2 border rounded">
                      <p className="font-medium">Michael Rodriguez, JD</p>
                      <p className="text-gray-600">Employment Law Expert</p>
                      <p className="text-blue-600">mrodriguez@legalfirm.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
            This is a sample report. Your results will be personalized to your specific case.
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleResults;
