import { FileText, Clock, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CaseOverviewWidget = () => {
  const { selectedCase, isLoadingCases } = useDashboard();
  const navigate = useNavigate();

  if (isLoadingCases) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-alegi-blue mx-auto mb-4"></div>
        <p className="text-gray-600">Loading case information...</p>
      </div>
    );
  }

  if (!selectedCase) {
    return (
      <div className="text-center py-8">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Case Selected</h3>
        <p className="text-gray-600 mb-4">
          Select a case from the sidebar to view its details, or create a new case to get started.
        </p>
        <Button 
          onClick={() => navigate('/dashboard/new-case')}
          className="bg-alegi-blue text-white hover:bg-alegi-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Case
        </Button>
      </div>
    );
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
                      className="bg-alegi-blue h-2 rounded-full" 
                      style={{ width: `${selectedCase.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-900">{selectedCase.confidence}%</span>
                </div>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                {new Date(selectedCase.date).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedCase.risk === 'High' ? 'bg-red-100 text-red-800' :
                  selectedCase.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
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
