// Analysis Components for ALEGI Frontend
// These components implement the 8 core legal analysis features outlined in CLAUDE.md

export { default as OutcomeProbabilityChart } from './OutcomeProbabilityChart';
export { default as SettlementAnalysisComponent } from './SettlementAnalysisComponent';
export { default as RiskAssessmentDashboard } from './RiskAssessmentDashboard';
export { default as PrecedentAnalysisView } from './PrecedentAnalysisView';

// Export types for component props
export type { 
  ProbabilityData,  
  OutcomeProbabilityChartProps 
} from './OutcomeProbabilityChart';

export type { 
  SettlementAnalysis,
  SettlementAnalysisComponentProps 
} from './SettlementAnalysisComponent';

export type { 
  RiskAssessment,
  RiskFactor,
  RiskAssessmentDashboardProps 
} from './RiskAssessmentDashboard';

export type { 
  PrecedentCase,
  PrecedentAnalysisViewProps 
} from './PrecedentAnalysisView';