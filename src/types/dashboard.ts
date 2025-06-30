// Types for our widget system
export type WidgetType = 
  // Center column widgets
  | 'caseOverview' 
  | 'predictedOutcome' 
  | 'complexityScore' 
  | 'riskAssessment' 
  | 'precedentAnalysis' 
  | 'outcomeProbability' 
  | 'judgeAnalysis' 
  | 'settlementVsTrialAnalysis' 
  | 'strategyRecommendations'
  | 'factStrengthAnalysis'
  | 'averageTimeResolution'
  | 'realTimeLawChanges'
  | 'keyFactors'
  | 'similarCases'
  | 'settlementLikelihood'
  | 'caseComparison'   // Now in left column
  | 'customReports'    // Now in left column
  // Right column widgets
  | 'legalResearchChatbot'
  | 'legalResearch'
  | 'newCaseEntry'
  | 'batchUpload'
  | 'legalChatbot';

export type Widget = {
  id: string;
  type: WidgetType;
  title: string;
  enabled: boolean;
  size: 'small' | 'medium' | 'large';
  position: number;
};

export type ColumnId = 'leftColumn' | 'centerColumn' | 'rightColumn';

export type Case = {
  id: string;
  title: string;
  status: 'Active' | 'Pending' | 'Closed';
  confidence: number;
  date: string;
  risk: 'Low' | 'Medium' | 'High';
};

export type DashboardContextType = {
  centerWidgets: Widget[];
  rightWidgets: Widget[];
  sidebarCollapsed: boolean;
  selectedCase: Case | null;
  recentCases: Case[];
  comparisonCase: Case | null;
  favoriteCases: Case[];
  isLoadingCases: boolean;
  toggleSidebar: () => void;
  moveWidget: (widgetId: string, sourceColumn: ColumnId, destinationColumn: ColumnId, newPosition: number) => void;
  resizeWidget: (widgetId: string, columnId: ColumnId, newSize: 'small' | 'medium' | 'large') => void;
  selectCase: (caseId: string) => void;
  selectComparisonCase: (caseId: string | null) => void;
  toggleFavorite: (caseId: string) => void;
  isFavorite: (caseId: string) => boolean;
  refreshCases: () => Promise<void>;
};
