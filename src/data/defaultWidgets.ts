import { Widget } from '@/types/dashboard';

// Default widgets configuration
export const defaultCenterWidgets: Widget[] = [
  // General dashboard widgets (shown when no case is selected)
  { id: 'dashboardOverview', type: 'dashboardOverview', title: 'Dashboard Overview', enabled: true, size: 'large', position: 0 },
  { id: 'averageTimeResolution', type: 'averageTimeResolution', title: 'Average Time for Resolution', enabled: true, size: 'small', position: 1 },
  { id: 'realTimeLawChanges', type: 'realTimeLawChanges', title: 'Real-Time Law Changes', enabled: true, size: 'medium', position: 2 },
  { id: 'analyzedCases', type: 'analyzedCases', title: 'Analyzed Cases Dashboard', enabled: true, size: 'small', position: 3 },
  
  // Case-specific widgets (shown when a case is selected)
  { id: 'caseOverview', type: 'caseOverview', title: 'Case Overview', enabled: true, size: 'medium', position: 4 },
  { id: 'predictedOutcome', type: 'predictedOutcome', title: 'Predicted Case Outcome', enabled: true, size: 'medium', position: 5 },
  { id: 'probabilityScore', type: 'probabilityScore', title: 'Case Outcome Probability Score', enabled: true, size: 'medium', position: 6 },
  { id: 'complexityScore', type: 'complexityScore', title: 'Case Complexity & Risk Score', enabled: true, size: 'small', position: 7 },
  { id: 'riskAssessment', type: 'riskAssessment', title: 'Risk Assessment', enabled: true, size: 'medium', position: 8 },
  { id: 'precedentAnalysis', type: 'precedentAnalysis', title: 'Precedent Analysis', enabled: true, size: 'large', position: 9 },
  { id: 'outcomeProbability', type: 'outcomeProbability', title: 'Outcome Probability Chart', enabled: true, size: 'medium', position: 10 },
  { id: 'judgeAnalysis', type: 'judgeAnalysis', title: 'Judge & Lawyer Analysis', enabled: true, size: 'medium', position: 11 },
  { id: 'settlementVsTrialAnalysis', type: 'settlementVsTrialAnalysis', title: 'Settlement vs Trial Analysis', enabled: true, size: 'medium', position: 12 },
  { id: 'settlementAnalysis', type: 'settlementAnalysis', title: 'Settlement vs. Trial Analysis', enabled: true, size: 'large', position: 13 },
  { id: 'costEstimator', type: 'costEstimator', title: 'Litigation Cost Estimator', enabled: true, size: 'large', position: 14 },
  { id: 'financialPrediction', type: 'financialPrediction', title: 'Financial Outcome Prediction', enabled: true, size: 'medium', position: 15 },
  { id: 'timeline', type: 'timeline', title: 'Average Time for Resolution', enabled: true, size: 'large', position: 16 },
  { id: 'strategyRecommendations', type: 'strategyRecommendations', title: 'AI Strategy Recommendations', enabled: true, size: 'large', position: 17 },
  { id: 'factStrengthAnalysis', type: 'factStrengthAnalysis', title: 'Fact Strength Analysis', enabled: true, size: 'medium', position: 18 },
  { id: 'similarCaseFinder', type: 'similarCaseFinder', title: 'Similar Case Finder', enabled: true, size: 'large', position: 19 },
  
  // Comparison and reports widgets
  { id: 'caseComparison', type: 'caseComparison', title: 'Case Comparison', enabled: true, size: 'medium', position: 20 },
  { id: 'customReports', type: 'customReports', title: 'Custom Reports', enabled: true, size: 'medium', position: 21 },
];

export const defaultRightWidgets: Widget[] = [
  { id: 'legalResearchChatbot', type: 'legalResearchChatbot', title: 'Legal Research & Assistant', enabled: true, size: 'large', position: 0 },
  { id: 'legalResearch', type: 'legalResearch', title: 'Legal Research', enabled: true, size: 'medium', position: 1 },
  { id: 'newCaseEntry', type: 'newCaseEntry', title: 'New Case Entry', enabled: true, size: 'medium', position: 2 },
  { id: 'batchUpload', type: 'batchUpload', title: 'Batch Upload', enabled: true, size: 'small', position: 3 },
  { id: 'legalChatbot', type: 'legalChatbot', title: 'Legal Chatbot', enabled: true, size: 'medium', position: 4 },
];
