
import { Widget } from '@/types/dashboard';

// Default widgets configuration
export const defaultCenterWidgets: Widget[] = [
  // Case comparison and custom reports will remain here but will be filtered for left column in the UI
  { id: 'caseComparison', type: 'caseComparison', title: 'Case Comparison', enabled: true, size: 'medium', position: 0 },
  { id: 'customReports', type: 'customReports', title: 'Custom Reports', enabled: true, size: 'medium', position: 1 },
  // Original center widgets with updated positions
  { id: 'predictedOutcome', type: 'predictedOutcome', title: 'Predicted Case Outcome', enabled: true, size: 'medium', position: 2 },
  { id: 'complexityScore', type: 'complexityScore', title: 'Case Complexity & Risk Score', enabled: true, size: 'small', position: 3 },
  { id: 'riskAssessment', type: 'riskAssessment', title: 'Risk Assessment', enabled: true, size: 'medium', position: 4 },
  { id: 'precedentAnalysis', type: 'precedentAnalysis', title: 'Precedent Analysis', enabled: true, size: 'large', position: 5 },
  { id: 'outcomeProbability', type: 'outcomeProbability', title: 'Outcome Probability Chart', enabled: true, size: 'medium', position: 6 },
  { id: 'judgeAnalysis', type: 'judgeAnalysis', title: 'Judge & Lawyer Analysis', enabled: true, size: 'medium', position: 7 },
  { id: 'settlementVsTrialAnalysis', type: 'settlementVsTrialAnalysis', title: 'Settlement vs Trial Analysis', enabled: true, size: 'medium', position: 8 },
  { id: 'strategyRecommendations', type: 'strategyRecommendations', title: 'AI Strategy Recommendations', enabled: true, size: 'large', position: 9 },
  { id: 'factStrengthAnalysis', type: 'factStrengthAnalysis', title: 'Fact Strength Analysis', enabled: true, size: 'medium', position: 10 },
  { id: 'averageTimeResolution', type: 'averageTimeResolution', title: 'Average Time for Resolution', enabled: true, size: 'small', position: 11 },
  { id: 'realTimeLawChanges', type: 'realTimeLawChanges', title: 'Real-Time Law Changes', enabled: true, size: 'medium', position: 12 },
];

export const defaultRightWidgets: Widget[] = [
  // Removed case comparison and custom reports, adjusting positions for remaining widgets
  { id: 'whatIfAnalysis', type: 'whatIfAnalysis', title: 'What-If Analysis', enabled: true, size: 'large', position: 0 },
  { id: 'legalResearchChatbot', type: 'legalResearchChatbot', title: 'Legal Research & Assistant', enabled: true, size: 'large', position: 1 },
];
