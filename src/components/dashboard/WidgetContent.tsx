import { WidgetType } from '@/types/dashboard';
import {
  BarChart,
  PieChart,
  Calendar,
  Users,
  FileText,
  Upload,
  BookOpen,
  Scale,
  MessageSquare,
  AlertCircle,
  Compass,
  Download,
  FilePlus2,
  UserCog,
  CaseLower,
  Gavel,
  BarChart3,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Import widget-specific components
import CaseOverviewWidget from './widgets/CaseOverviewWidget';
import DashboardOverviewWidget from './widgets/DashboardOverviewWidget';
import PredictedOutcomeWidget from './widgets/PredictedOutcomeWidget';
import NewCaseEntryWidget from './widgets/NewCaseEntryWidget';
import BatchUploadWidget from './widgets/BatchUploadWidget';
import LegalChatbotWidget from './widgets/LegalChatbotWidget';
import FactStrengthAnalysisWidget from './widgets/FactStrengthAnalysisWidget';
import AverageTimeResolutionWidget from './widgets/AverageTimeResolutionWidget';
import RealTimeLawChangesWidget from './widgets/RealTimeLawChangesWidget';

interface WidgetContentProps {
  type: WidgetType;
  isComparison?: boolean;
}

const WidgetContent = ({ type, isComparison = false }: WidgetContentProps) => {
  // Render different content based on widget type
  switch (type) {
    case 'dashboardOverview':
      return <DashboardOverviewWidget />;
    case 'caseOverview':
      return <CaseOverviewWidget />;
    case 'predictedOutcome':
      return <PredictedOutcomeWidget isComparison={isComparison} />;
    case 'newCaseEntry':
      return <NewCaseEntryWidget />;
    case 'batchUpload':
      return <BatchUploadWidget />;
    case 'legalChatbot':
    case 'legalResearchChatbot':
      return <LegalChatbotWidget />;
    case 'complexityScore':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Case Complexity</h4>
              <p className="text-2xl font-bold text-alegi-blue">7.8/10</p>
            </div>
            <AlertCircle className="text-amber-500" size={36} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Risk Score</span>
              <span className="font-medium">High (72%)</span>
            </div>
            <Progress value={72} className="h-2 bg-gray-200" />
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <p>This case involves multiple jurisdictions and complex procedural history, contributing to high risk factors.</p>
          </div>
        </div>
      );
    case 'keyFactors':
    case 'riskAssessment':
      return (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Top 5 Influencing Factors</h4>
          <div className="space-y-2">
            {[
              { factor: 'Prior similar rulings by Judge Chen', impact: 'Very High', direction: 'Positive' },
              { factor: 'Precedent in Thompson v. Allied Corp', impact: 'High', direction: 'Positive' },
              { factor: 'Statutory time limitations', impact: 'Medium', direction: 'Negative' },
              { factor: 'Inconsistent witness statements', impact: 'High', direction: 'Negative' },
              { factor: 'Recent appellate court decision', impact: 'Medium', direction: 'Positive' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between p-2 bg-gray-50 rounded-md">
                <div className="text-sm">{item.factor}</div>
                <div className={`text-sm font-medium ${item.direction === 'Positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.impact} ({item.direction})
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'similarCases':
    case 'precedentAnalysis':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium mb-2">Similar Past Cases</h4>
          <div className="space-y-3">
            {[
              { title: 'Johnson v. MedTech Inc.', similarity: '87%', outcome: 'Won', amount: '$1.2M' },
              { title: 'Peterson Healthcare Trust', similarity: '82%', outcome: 'Settled', amount: '$850K' },
              { title: 'Williams Medical Group', similarity: '78%', outcome: 'Lost', amount: '$0' },
              { title: 'Roberts v. City Hospital', similarity: '75%', outcome: 'Won', amount: '$2.1M' }
            ].map((caseItem, idx) => (
              <div key={idx} className="flex p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="mr-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    caseItem.outcome === 'Won' ? 'bg-green-100 text-green-600' : 
                    caseItem.outcome === 'Lost' ? 'bg-red-100 text-red-600' : 
                    'bg-amber-100 text-amber-600'
                  }`}>
                    <Scale size={18} />
                  </div>
                </div>
                <div className="flex-grow">
                  <h5 className="text-sm font-medium">{caseItem.title}</h5>
                  <div className="flex text-xs text-gray-500 mt-1">
                    <span className="mr-3">Similarity: {caseItem.similarity}</span>
                    <span className="mr-3">Outcome: {caseItem.outcome}</span>
                    <span>Settlement: {caseItem.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'outcomeProbability':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Outcome Probabilities</h4>
          <div className="flex justify-around text-center">
            <div className="space-y-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">64%</span>
              </div>
              <p className="text-xs">Settlement</p>
            </div>
            <div className="space-y-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-blue-600">28%</span>
              </div>
              <p className="text-xs">Trial Win</p>
            </div>
            <div className="space-y-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-xl font-bold text-red-600">8%</span>
              </div>
              <p className="text-xs">Trial Loss</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on 547 similar cases in our database</p>
        </div>
      );
    case 'judgeAnalysis':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Judge & Lawyer Analysis</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center">
                <UserCog className="mr-2 text-alegi-blue" size={18} />
                <span className="font-medium text-sm">Judge Maria Rodriguez</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Similar cases ruled:</span>
                  <span>42</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Plaintiff favor rate:</span>
                  <span className="text-green-600 font-medium">68%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Avg. settlement amount:</span>
                  <span>$820,000</span>
                </div>
              </div>
            </div>
            
            {/* Added Lawyer Analysis Box */}
            <div className="p-3 border rounded-lg">
              <div className="flex items-center">
                <Gavel className="mr-2 text-alegi-blue" size={18} />
                <span className="font-medium text-sm">Attorney James Wilson</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Similar cases handled:</span>
                  <span>36</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Success rate:</span>
                  <span className="text-green-600 font-medium">74%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Avg. settlement amount:</span>
                  <span>$950,000</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Judge Rodriguez has historically favored plaintiffs in medical negligence cases with strong expert testimony. Attorney Wilson has a strong record in similar cases.</p>
            </div>
          </div>
        </div>
      );
    case 'settlementVsTrialAnalysis':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Settlement vs Trial Analysis</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg bg-green-50">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">Recommended: Settlement</span>
                <span className="text-green-600 font-bold">$1.2M</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">High probability of favorable settlement based on similar cases</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-green-600">$1.2M</div>
                <div className="text-xs text-gray-600">Expected Settlement</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-blue-600">$2.1M</div>
                <div className="text-xs text-gray-600">Trial Win Potential</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              <p>• 64% chance of settlement</p>
              <p>• 28% chance of trial win</p>
              <p>• 8% chance of trial loss</p>
            </div>
          </div>
        </div>
      );
    case 'strategyRecommendations':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">AI Strategy Recommendations</h4>
          <div className="space-y-3">
            {[
              { priority: 'High', action: 'Focus on settlement negotiations', reason: 'Strong precedent and favorable judge history' },
              { priority: 'Medium', action: 'Prepare expert witness testimony', reason: 'Technical aspects may need clarification' },
              { priority: 'Low', action: 'Consider mediation', reason: 'Both parties have incentive to avoid trial costs' }
            ].map((rec, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>
                <div className="font-medium text-sm">{rec.action}</div>
                <div className="text-xs text-gray-600 mt-1">{rec.reason}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'factStrengthAnalysis':
      return <FactStrengthAnalysisWidget />;
    case 'averageTimeResolution':
      return <AverageTimeResolutionWidget />;
    case 'realTimeLawChanges':
      return <RealTimeLawChangesWidget />;
    case 'legalResearch':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Legal Research</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center">
                <BookOpen className="mr-2 text-alegi-blue" size={18} />
                <span className="font-medium text-sm">Recent Case Law</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-xs">
                  <span className="font-medium">Smith v. Johnson (2023)</span>
                  <p className="text-gray-600">Established precedent for medical malpractice in similar circumstances</p>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center">
                <Scale className="mr-2 text-alegi-blue" size={18} />
                <span className="font-medium text-sm">Statutory Updates</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-xs">
                  <span className="font-medium">Health Care Reform Act 2023</span>
                  <p className="text-gray-600">New regulations affecting medical liability cases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'caseComparison':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Case Comparison</h4>
          <p className="text-xs text-gray-500">Select cases to compare outcomes, strategies, and risk factors.</p>
          <div className="p-3 border rounded-lg bg-gray-50">
            <div className="text-center text-sm text-gray-600">
              <Compass className="mx-auto h-8 w-8 mb-2" />
              <p>Use the case selector to choose cases for comparison</p>
            </div>
          </div>
        </div>
      );
    case 'customReports':
      return (
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Custom Reports</h4>
          <p className="text-xs text-gray-500">Generate detailed reports and analytics for your cases.</p>
          <div className="p-3 border rounded-lg bg-gray-50">
            <div className="text-center text-sm text-gray-600">
              <FilePlus2 className="mx-auto h-8 w-8 mb-2" />
              <p>Access comprehensive reporting tools</p>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="text-center text-gray-500">
          <p>Widget type "{type}" not implemented</p>
        </div>
      );
  }
};

export default WidgetContent;
