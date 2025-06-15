
import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const CaseOverviewWidget = () => {
  const { selectedCase } = useDashboard();

  if (!selectedCase) {
    return <div className="text-center py-4">No case selected</div>;
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr key={selectedCase.id} className="hover:bg-gray-50">
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <FileText size={14} className="text-gray-400 mr-2" />
                  <div>
                    <div className="text-xs font-medium text-gray-900">{selectedCase.title}</div>
                    <div className="text-xs text-gray-500">{selectedCase.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedCase.status === 'Active' ? 'bg-green-100 text-green-800' :
                  selectedCase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedCase.status === 'Active' && <CheckCircle size={12} className="mr-1" />}
                  {selectedCase.status === 'Pending' && <Clock size={12} className="mr-1" />}
                  {selectedCase.status === 'Closed' && <CheckCircle size={12} className="mr-1" />}
                  {selectedCase.status}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedCase.confidence > 80 ? 'bg-green-500' :
                        selectedCase.confidence > 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${selectedCase.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs">{selectedCase.confidence}%</span>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                {new Date(selectedCase.date).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedCase.risk === 'Low' ? 'bg-green-100 text-green-800' :
                  selectedCase.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedCase.risk === 'High' && <AlertTriangle size={12} className="mr-1" />}
                  {selectedCase.risk}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <div>Case opened: {new Date(selectedCase.date).toLocaleDateString()}</div>
        <div>Last updated: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default CaseOverviewWidget;
