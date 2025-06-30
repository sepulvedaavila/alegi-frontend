import { useDashboard } from '@/contexts/DashboardContext';
import WidgetContainer from '../WidgetContainer';
import CaseOverviewWidget from '../widgets/CaseOverviewWidget';

interface DashboardContentProps {
  dashboardRef: React.RefObject<HTMLDivElement>;
}

const DashboardContent = ({ dashboardRef }: DashboardContentProps) => {
  const { centerWidgets, rightWidgets, comparisonCase } = useDashboard();

  // Filter out case comparison and custom reports widgets from center column
  const mainCenterWidgets = centerWidgets.filter(widget => 
    widget.type !== 'caseComparison' && widget.type !== 'customReports'
  );

  // Filter out case-specific widgets since we no longer have a selected case
  const generalWidgets = mainCenterWidgets.filter(widget => 
    !['caseOverview', 'predictedOutcome', 'complexityScore', 'riskAssessment', 'precedentAnalysis', 'outcomeProbability', 'judgeAnalysis', 'settlementVsTrialAnalysis', 'strategyRecommendations', 'factStrengthAnalysis'].includes(widget.type)
  );

  return (
    <div ref={dashboardRef} data-dashboard-container className="flex flex-col lg:flex-row gap-4">
      {/* Center Column - 70% width */}
      <div className="lg:w-[70%]">
        <div className="flex flex-col gap-4">
          {/* General Dashboard Widgets */}
          <WidgetContainer 
            columnId="centerColumn" 
            widgets={generalWidgets}
            title="Dashboard Analytics"
            isComparison={false}
          />
        </div>
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
