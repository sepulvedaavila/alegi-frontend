
import { Clock, Calendar, History, ArrowRight } from 'lucide-react';

const AverageTimeResolutionWidget = ({ caseData = null }) => {
  if (!caseData) {
    return <div className="text-center py-4">No case data available</div>;
  }

  // Example data - would come from API in a real application
  const resolutionData = {
    average: 14.5, // in months
    median: 12, // in months
    shortest: 4, // in months
    longest: 31, // in months
    totalCases: 47,
    byType: [
      { type: 'Settlement', percentage: 68, timeInMonths: 10 },
      { type: 'Trial', percentage: 22, timeInMonths: 22 },
      { type: 'Dismissal', percentage: 10, timeInMonths: 8 },
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">Average Time for Resolution</h4>
          <p className="text-2xl font-bold text-alegi-blue">{resolutionData.average} Months</p>
        </div>
        <Clock className="text-amber-500" size={36} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm text-gray-500">Median</div>
          <div className="text-lg font-bold">{resolutionData.median} Months</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-sm text-gray-500">Range</div>
          <div className="text-lg font-bold flex items-center justify-center">
            <span>{resolutionData.shortest}</span>
            <ArrowRight size={14} className="mx-1" />
            <span>{resolutionData.longest}</span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-3">
        <h5 className="text-sm font-medium border-b pb-2 mb-3">By Resolution Type</h5>
        <div className="space-y-3">
          {resolutionData.byType.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  item.type === 'Settlement' ? 'bg-green-500' : 
                  item.type === 'Trial' ? 'bg-blue-500' : 
                  'bg-amber-500'
                }`}></div>
                <span className="text-sm">{item.type}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">{item.percentage}%</span>
                <span className="text-sm font-medium">{item.timeInMonths} Months</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center text-xs text-gray-500 justify-between">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          <span>Based on {resolutionData.totalCases} similar cases</span>
        </div>
        <div className="flex items-center">
          <History size={12} className="mr-1" />
          <span>Last 3 years</span>
        </div>
      </div>
    </div>
  );
};

export default AverageTimeResolutionWidget;
