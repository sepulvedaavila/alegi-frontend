// Types for our widget system
export type WidgetType = 
  // General dashboard widgets
  | 'dashboardOverview'
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
  | 'legalChatbot'
  // New MVP feature widgets
  | 'probabilityScore'
  | 'settlementAnalysis'
  | 'costEstimator'
  | 'financialPrediction'
  | 'timeline'
  | 'analyzedCases'
  | 'similarCaseFinder'
  | 'lawUpdates';

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

// New MVP Feature Interfaces
export interface ProbabilityScoreData {
  successProbability: number; // 0-100
  failureProbability: number; // 0-100
  settlementProbability: number; // 0-100
  confidence: 'high' | 'medium' | 'low';
  factors: {
    jurisdiction: number;
    caseType: number;
    precedent: number;
    proceduralPosture: number;
  };
}

export interface SettlementAnalysis {
  settlement: {
    estimatedValue: { min: number; max: number; likely: number };
    timeToResolve: number; // days
    costs: number;
    successProbability: number;
  };
  trial: {
    estimatedValue: { min: number; max: number; likely: number };
    timeToResolve: number; // days
    costs: number;
    successProbability: number;
  };
  recommendation: 'settlement' | 'trial' | 'neutral';
  reasoning: string[];
}

export interface PrecedentCase {
  id: string;
  caseName: string;
  citation: string;
  relevanceScore: number; // 0-100
  outcome: string;
  keyPoints: string[];
  court: string;
  date: string;
  similarityFactors: string[];
}

export interface JudgeTrends {
  judge: {
    name: string;
    court: string;
    appointedBy?: string;
  };
  statistics: {
    totalCases: number;
    plaintiffWinRate: number;
    avgTimeToRuling: number; // days
    summaryJudgmentRate: number;
    appealOverturnRate: number;
  };
  similarCaseOutcomes: {
    won: number;
    lost: number;
    settled: number;
  };
  rulingPatterns: Array<{
    pattern: string;
    frequency: number;
  }>;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 0-100
  riskFactors: Array<{
    category: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    mitigation: string;
  }>;
  recommendations: string[];
}

export interface CostEstimate {
  strategy: 'aggressive' | 'standard' | 'conservative';
  breakdown: {
    attorneyFees: { min: number; max: number };
    courtCosts: { min: number; max: number };
    expertWitness: { min: number; max: number };
    discovery: { min: number; max: number };
    other: { min: number; max: number };
  };
  totalEstimate: { min: number; max: number; likely: number };
  paymentSchedule: Array<{
    phase: string;
    amount: number;
    timing: string;
  }>;
}

export interface FinancialPrediction {
  settlementRange: {
    low: number;
    likely: number;
    high: number;
    confidence: number;
  };
  verdictRange: {
    low: number;
    likely: number;
    high: number;
    confidence: number;
  };
  factors: Array<{
    name: string;
    impact: 'positive' | 'negative';
    weight: number;
  }>;
}

export interface ResolutionTimeline {
  estimatedDays: {
    min: number;
    average: number;
    max: number;
  };
  phases: Array<{
    name: string;
    duration: number;
    startDate?: Date;
    endDate?: Date;
    status: 'completed' | 'current' | 'future';
  }>;
  factors: Array<{
    factor: string;
    impact: 'speeds up' | 'slows down';
    days: number;
  }>;
}

export interface AnalyzedCasesStats {
  totalCasesAnalyzed: number;
  lastUpdated: Date;
  coverageByJurisdiction: Array<{
    jurisdiction: string;
    count: number;
  }>;
  coverageByCaseType: Array<{
    type: string;
    count: number;
  }>;
  dataQualityScore: number;
}

export interface SimilarCase {
  id: string;
  similarity: number; // 0-100
  caseName: string;
  outcome: string;
  keyFacts: string[];
  matchingFactors: Array<{
    factor: string;
    matchScore: number;
  }>;
  citation: string;
  summary: string;
}

export interface LawUpdate {
  id: string;
  type: 'statute' | 'case_law' | 'regulation';
  title: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  effectiveDate: Date;
  jurisdiction: string;
  relatedCases: string[];
  source: string;
}

export type DashboardContextType = {
  centerWidgets: Widget[];
  rightWidgets: Widget[];
  sidebarCollapsed: boolean;
  recentCases: Case[];
  comparisonCase: Case | null;
  favoriteCases: Case[];
  isLoadingCases: boolean;
  toggleSidebar: () => void;
  moveWidget: (widgetId: string, sourceColumn: ColumnId, destinationColumn: ColumnId, newPosition: number) => void;
  resizeWidget: (widgetId: string, columnId: ColumnId, newSize: 'small' | 'medium' | 'large') => void;
  selectComparisonCase: (caseId: string | null) => void;
  toggleFavorite: (caseId: string) => void;
  isFavorite: (caseId: string) => boolean;
  refreshCases: () => Promise<void>;
};
