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
                  <span>Avg. recovery amount:</span>
                  <span>$910,000</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Judge Rodriguez has historically favored plaintiffs in medical negligence cases with strong expert testimony. Attorney Wilson has a strong record in similar cases.</p>
            </div>
          </div>
        </div>
      );
    case 'settlementLikelihood':
    case 'settlementVsTrialAnalysis':
      return (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Settlement & Appeal Analysis</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-blue-50 rounded-md text-center">
              <div className="text-xl font-bold text-blue-600">64%</div>
              <div className="text-xs">Settlement Likely</div>
            </div>
            <div className="p-2 bg-amber-50 rounded-md text-center">
              <div className="text-xl font-bold text-amber-600">31%</div>
              <div className="text-xs">Appeal Probability</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <p>Recommended settlement window: $750,000 - $950,000</p>
            <p>Based on 124 similar cases in the Northern District</p>
          </div>
        </div>
      );
    case 'strategyRecommendations':
      return (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">AI Strategy Recommendations</h4>
          <div className="space-y-2">
            <div className="p-3 border border-green-200 bg-green-50 rounded-md">
              <h5 className="text-sm font-medium text-green-700">Primary Strategy</h5>
              <p className="text-xs mt-1">Pursue early settlement negotiations highlighting the three strongest precedent cases. Expert testimony from Dr. Chen would significantly strengthen position.</p>
            </div>
            <div className="p-3 border rounded-md">
              <h5 className="text-sm font-medium">Alternative Approaches</h5>
              <ul className="list-disc text-xs pl-4 mt-1 space-y-1">
                <li>File motion to exclude unreliable witness testimony</li>
                <li>Request summary judgment on procedural grounds</li>
                <li>Develop stronger causation argument with additional expert</li>
              </ul>
            </div>
            <div className="p-3 border rounded-md">
              <h5 className="text-sm font-medium">Document Recommendations</h5>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center text-xs">
                  <FileText className="mr-1 text-alegi-blue" size={14} />
                  <span>Updated Complaint</span>
                </div>
                <div className="flex items-center text-xs">
                  <FileText className="mr-1 text-alegi-blue" size={14} />
                  <span>Expert Witness List</span>
                </div>
                <div className="flex items-center text-xs">
                  <FileText className="mr-1 text-alegi-blue" size={14} />
                  <span>Settlement Proposal</span>
                </div>
                <div className="flex items-center text-xs">
                  <FileText className="mr-1 text-alegi-blue" size={14} />
                  <span>Discovery Request</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'factStrengthAnalysis':
      return <FactStrengthAnalysisWidget />;
    case 'averageTimeResolution':
      return <AverageTimeResolutionWidget />;
    case 'realTimeLawChanges':
      return <RealTimeLawChangesWidget />;
    case 'caseComparison':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <Scale className="mx-auto text-gray-400 mb-2" size={24} />
            <h3 className="text-sm font-medium">Case Comparison Tool</h3>
            <p className="text-xs text-gray-500 mt-1">Select cases to compare outcomes and factors</p>
            <button className="mt-3 bg-alegi-blue text-white text-xs px-3 py-1 rounded">
              Select Cases
            </button>
          </div>
        </div>
      );
    case 'customReports':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4 w-full">
            <FileText className="mx-auto text-gray-400 mb-2" size={24} />
            <h3 className="text-sm font-medium">Custom Reports</h3>
            <p className="text-xs text-gray-500 mt-1 mb-3">Generate comprehensive reports from your case data</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <BarChart3 className="mr-1 text-alegi-blue" size={12} />
                  <span>Performance Summary</span>
                </div>
                <span className="text-gray-500">PDF</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <DollarSign className="mr-1 text-green-600" size={12} />
                  <span>Financial Analysis</span>
                </div>
                <span className="text-gray-500">Excel</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="mr-1 text-amber-600" size={12} />
                  <span>Risk Assessment</span>
                </div>
                <span className="text-gray-500">CSV</span>
              </div>
            </div>
            
            <button className="mt-3 bg-alegi-blue text-white text-xs px-3 py-1 rounded hover:bg-alegi-blue/90 transition-colors">
              View All Reports
            </button>
          </div>
        </div>
      );
    case 'legalResearch':
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4">
            <BookOpen className="mx-auto text-gray-400 mb-2" size={24} />
            <h3 className="text-sm font-medium">Legal Research</h3>
            <p className="text-xs text-gray-500 mt-1">Search for relevant cases and precedents</p>
            <div className="mt-3 flex">
              <input 
                type="text" 
                placeholder="Search case law..." 
                className="border border-gray-300 rounded-l-md text-xs px-3 py-1 flex-grow"
              />
              <button className="bg-alegi-blue text-white text-xs px-3 py-1 rounded-r-md">
                Search
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return <div>Widget content not implemented: {type}</div>;
  }
};

export default WidgetContent;
