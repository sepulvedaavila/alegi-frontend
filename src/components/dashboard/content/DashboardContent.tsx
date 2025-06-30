import { useDashboard } from '@/contexts/DashboardContext';
import WidgetContainer from '../WidgetContainer';
import CaseOverviewWidget from '../widgets/CaseOverviewWidget';

interface DashboardContentProps {
  dashboardRef: React.RefObject<HTMLDivElement>;
}

const DashboardContent = ({ dashboardRef }: DashboardContentProps) => {
  const { centerWidgets, rightWidgets, selectedCase, comparisonCase } = useDashboard();

  // Filter out case comparison and custom reports widgets from center column
  const mainCenterWidgets = centerWidgets.filter(widget => 
    widget.type !== 'caseComparison' && widget.type !== 'customReports'
  );

  // Filter out case-specific widgets when no case is selected
  const generalWidgets = mainCenterWidgets.filter(widget => 
    !['caseOverview', 'predictedOutcome', 'complexityScore', 'riskAssessment', 'precedentAnalysis', 'outcomeProbability', 'judgeAnalysis', 'settlementVsTrialAnalysis', 'strategyRecommendations', 'factStrengthAnalysis'].includes(widget.type)
  );

  return (
    <div ref={dashboardRef} data-dashboard-container className="flex flex-col lg:flex-row gap-4">
      {/* Center Column - 70% width */}
      <div className="lg:w-[70%]">
        {comparisonCase ? (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Case Comparison</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-r pr-4">
                  <h3 className="font-medium text-alegi-blue">{selectedCase?.title}</h3>
                  <p className="text-sm text-gray-500">ID: {selectedCase?.id}</p>
                  <div className="mt-2">
                    <div className="text-sm">
                      <span className="font-medium">Status:</span> {selectedCase?.status}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Confidence:</span> {selectedCase?.confidence}%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Risk:</span> {selectedCase?.risk}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-alegi-blue">{comparisonCase.title}</h3>
                  <p className="text-sm text-gray-500">ID: {comparisonCase.id}</p>
                  <div className="mt-2">
                    <div className="text-sm">
                      <span className="font-medium">Status:</span> {comparisonCase.status}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Confidence:</span> {comparisonCase.confidence}%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Risk:</span> {comparisonCase.risk}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <WidgetContainer 
              columnId="centerColumn" 
              widgets={mainCenterWidgets}
              title="Case Insights"
              isComparison={true}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* General Dashboard Widgets */}
            <WidgetContainer 
              columnId="centerColumn" 
              widgets={generalWidgets}
              title="Dashboard Analytics"
              isComparison={false}
            />
          </div>
        )}
      </div>

      {/* Right Column - 30% width - Now Sticky */}
      <div className="lg:w-[30%]">
        <div className="sticky top-4">
          <WidgetContainer 
            columnId="rightColumn" 
            widgets={rightWidgets} 
            title="Actions"
            isComparison={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
