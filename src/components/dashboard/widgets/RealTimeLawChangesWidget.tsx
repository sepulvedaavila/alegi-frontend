
import { FileText, AlertCircle, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

const RealTimeLawChangesWidget = () => {
  const { selectedCase } = useDashboard();

  if (!selectedCase) {
    return <div className="text-center py-4">No case selected</div>;
  }

  // Example data - would come from API in a real application
  const lawChanges = [
    {
      id: 1,
      title: 'Amendment to Medical Liability Act §501(c)',
      date: '2023-10-15',
      changeType: 'Amendment',
      impact: 'High',
      summary: 'Revised standard for establishing expert witness credibility in medical malpractice cases.',
      source: 'https://legislature.example.gov/bills/2023/HB1234',
    },
    {
      id: 2,
      title: 'Supreme Court Ruling: Martinez v. General Hospital',
      date: '2023-07-22',
      changeType: 'Case Law',
      impact: 'Medium',
      summary: 'Established new precedent for causation in hospital negligence cases.',
      source: 'https://courts.example.gov/supreme/opinions/2023/martinez',
    },
    {
      id: 3,
      title: 'Healthcare Regulatory Update 2023-B',
      date: '2023-05-03',
      changeType: 'Regulation',
      impact: 'Low',
      summary: 'Updated documentation requirements for patient informed consent procedures.',
      source: 'https://health.example.gov/regulations/2023-B',
    },
    {
      id: 4,
      title: 'Federal Rule of Evidence 702 Revision',
      date: '2023-01-17',
      changeType: 'Rule Change',
      impact: 'Medium',
      summary: 'Modified standards for admission of expert testimony in federal courts.',
      source: 'https://courts.example.gov/rules/evidence/702',
    },
  ];

  // Calculate how recent a change is
  const getRecencyLabel = (dateString: string) => {
    const changeDate = new Date(dateString);
    const now = new Date();
    const monthsDiff = (now.getFullYear() - changeDate.getFullYear()) * 12 + now.getMonth() - changeDate.getMonth();
    
    if (monthsDiff < 1) return 'New';
    if (monthsDiff < 3) return 'Recent';
    return '';
  };

  // Get appropriate color for impact level
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">Real-Time Law Changes</h4>
          <p className="text-sm text-gray-500">Relevant to {selectedCase.title}</p>
        </div>
        <BookOpen className="text-alegi-blue" size={24} />
      </div>

      <div className="space-y-3">
        {lawChanges.map((change) => (
          <div key={change.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-2">
                <FileText size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium">{change.title}</h5>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar size={12} className="mr-1" />
                    <span>{new Date(change.date).toLocaleDateString()}</span>
                    {getRecencyLabel(change.date) && (
                      <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {getRecencyLabel(change.date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactColor(change.impact)}`}>
                {change.impact} Impact
              </span>
            </div>
            
            <div className="mt-2 text-xs text-gray-600">{change.summary}</div>
            
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                {change.changeType}
              </span>
              <a 
                href={change.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-alegi-blue hover:underline flex items-center"
              >
                View Source <ExternalLink size={10} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>4 changes in the last 12 months</span>
        <a href="#" className="text-alegi-blue hover:underline flex items-center">
          View All <ExternalLink size={10} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default RealTimeLawChangesWidget;
