import { User, Briefcase, TrendingUp, Award, Clock, DollarSign, BarChart3, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LawyerAnalysisWidgetProps {
  caseId?: string;
  isComparison?: boolean;
  caseData?: any;
}

const LawyerAnalysisWidget = ({ caseId, isComparison = false, caseData = null }: LawyerAnalysisWidgetProps) => {
  const renderLawyerAnalysis = (caseData: any, className = '') => {
    // Mock data - would come from API in real application
    const lawyerData = {
      plaintiffLawyer: {
        name: 'Sarah Johnson, Esq.',
        firm: 'Johnson & Associates Law Firm',
        experience: '12 years',
        specialization: 'Medical Malpractice',
        similarCases: 47,
        successRate: 78,
        averageRecovery: '$1,250,000',
        averageTimeToResolution: '14.2 months',
        recentPerformance: [
          { case: 'Smith v. MedCorp', outcome: 'Won', amount: '$2.1M', duration: '16 months' },
          { case: 'Davis v. HealthSys', outcome: 'Settled', amount: '$850K', duration: '8 months' },
          { case: 'Wilson v. CareGroup', outcome: 'Won', amount: '$1.8M', duration: '22 months' }
        ]
      },
      defendantLawyer: {
        name: 'Michael Chen, Esq.',
        firm: 'Chen & Partners LLP',
        experience: '18 years',
        specialization: 'Defense Litigation',
        similarCases: 34,
        successRate: 65,
        averageRecovery: '$420,000',
        averageTimeToResolution: '18.5 months',
        recentPerformance: [
          { case: 'Brown v. TechMed', outcome: 'Settled', amount: '$650K', duration: '12 months' },
          { case: 'Taylor v. MedGroup', outcome: 'Dismissed', amount: '$0', duration: '6 months' },
          { case: 'Anderson v. HealthCorp', outcome: 'Settled', amount: '$320K', duration: '15 months' }
        ]
      }
    };

    const getSuccessRateColor = (rate: number) => {
      if (rate >= 75) return 'text-green-600 bg-green-100';
      if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    const getOutcomeColor = (outcome: string) => {
      switch (outcome) {
        case 'Won': return 'text-green-600 bg-green-100';
        case 'Settled': return 'text-blue-600 bg-blue-100';
        case 'Dismissed': return 'text-gray-600 bg-gray-100';
        default: return 'text-red-600 bg-red-100';
      }
    };

    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="mr-2 text-alegi-blue" size={20} />
            <h4 className="text-sm font-medium">Lawyer Analysis</h4>
          </div>
          <Badge className="bg-purple-100 text-purple-800 text-xs">
            Performance Data
          </Badge>
        </div>

        {/* Plaintiff Lawyer */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <User className="mr-2 text-green-600" size={18} />
              <div>
                <h5 className="text-sm font-medium">Plaintiff Attorney</h5>
                <p className="text-xs text-gray-600">{lawyerData.plaintiffLawyer.name}</p>
              </div>
            </div>
            <Badge className={getSuccessRateColor(lawyerData.plaintiffLawyer.successRate)}>
              {lawyerData.plaintiffLawyer.successRate}% Success Rate
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Firm:</span>
                <span className="font-medium">{lawyerData.plaintiffLawyer.firm}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{lawyerData.plaintiffLawyer.experience}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Specialization:</span>
                <span className="font-medium">{lawyerData.plaintiffLawyer.specialization}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Similar Cases:</span>
                <span className="font-medium">{lawyerData.plaintiffLawyer.similarCases}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Avg. Recovery:</span>
                <span className="font-medium">{lawyerData.plaintiffLawyer.averageRecovery}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Avg. Duration:</span>
                <span className="font-medium">{lawyerData.plaintiffLawyer.averageTimeToResolution}</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="text-xs font-medium mb-2">Recent Performance</h6>
            <div className="space-y-2">
              {lawyerData.plaintiffLawyer.recentPerformance.map((case_, index) => (
                <div key={index} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
                  <span className="font-medium">{case_.case}</span>
                  <div className="flex items-center space-x-2">
                    <Badge className={getOutcomeColor(case_.outcome)}>
                      {case_.outcome}
                    </Badge>
                    <span className="text-gray-600">{case_.amount}</span>
                    <span className="text-gray-500">({case_.duration})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Defendant Lawyer */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <User className="mr-2 text-red-600" size={18} />
              <div>
                <h5 className="text-sm font-medium">Defendant Attorney</h5>
                <p className="text-xs text-gray-600">{lawyerData.defendantLawyer.name}</p>
              </div>
            </div>
            <Badge className={getSuccessRateColor(lawyerData.defendantLawyer.successRate)}>
              {lawyerData.defendantLawyer.successRate}% Success Rate
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Firm:</span>
                <span className="font-medium">{lawyerData.defendantLawyer.firm}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{lawyerData.defendantLawyer.experience}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Specialization:</span>
                <span className="font-medium">{lawyerData.defendantLawyer.specialization}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Similar Cases:</span>
                <span className="font-medium">{lawyerData.defendantLawyer.similarCases}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Avg. Settlement:</span>
                <span className="font-medium">{lawyerData.defendantLawyer.averageRecovery}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Avg. Duration:</span>
                <span className="font-medium">{lawyerData.defendantLawyer.averageTimeToResolution}</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="text-xs font-medium mb-2">Recent Performance</h6>
            <div className="space-y-2">
              {lawyerData.defendantLawyer.recentPerformance.map((case_, index) => (
                <div key={index} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
                  <span className="font-medium">{case_.case}</span>
                  <div className="flex items-center space-x-2">
                    <Badge className={getOutcomeColor(case_.outcome)}>
                      {case_.outcome}
                    </Badge>
                    <span className="text-gray-600">{case_.amount}</span>
                    <span className="text-gray-500">({case_.duration})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <h6 className="text-sm font-medium text-blue-800 mb-2">Strategic Insights</h6>
          <div className="text-xs text-blue-700 space-y-1">
            <p>• Plaintiff attorney has strong track record in medical malpractice cases</p>
            <p>• Defendant attorney tends to settle cases with moderate exposure</p>
            <p>• Plaintiff's higher success rate suggests favorable settlement potential</p>
            <p>• Both attorneys have experience with similar case types</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 size={12} className="mr-1" />
            <span>Based on 81 similar attorney matchups</span>
          </div>
          <span>Updated: Today</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isComparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r pr-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case A</h4>
            {renderLawyerAnalysis(caseData)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case B</h4>
            {renderLawyerAnalysis(caseData)}
          </div>
        </div>
      ) : (
        renderLawyerAnalysis(caseData)
      )}
    </div>
  );
};

export default LawyerAnalysisWidget; 