import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User, Building, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp, BarChart3, Copy, RefreshCw, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useMemo, useCallback, Component, ReactNode } from 'react';
import { CompleteCase } from '@/utils/case/types';
import { useCaseViewData } from '@/hooks/useCaseViewData';
import AnalysisStatusIndicator from '@/components/dashboard/AnalysisStatusIndicator';
import { toast } from 'sonner';

// Import all the case insights widgets
import PredictedOutcomeWidget from '@/components/dashboard/widgets/PredictedOutcomeWidget';
import CaseComplexityRiskWidget from '@/components/dashboard/widgets/CaseComplexityRiskWidget';
import RiskAssessmentWidget from '@/components/dashboard/widgets/RiskAssessmentWidget';
import PrecedentAnalysisWidget from '@/components/dashboard/widgets/PrecedentAnalysisWidget';
import JudgeAnalysisWidget from '@/components/dashboard/widgets/JudgeAnalysisWidget';
import LawyerAnalysisWidget from '@/components/dashboard/widgets/LawyerAnalysisWidget';
import SettlementVsTrialAnalysisWidget from '@/components/dashboard/widgets/SettlementVsTrialAnalysisWidget';
import AIStrategyRecommendationsWidget from '@/components/dashboard/widgets/AIStrategyRecommendationsWidget';
import FactStrengthAnalysisWidget from '@/components/dashboard/widgets/FactStrengthAnalysisWidget';
import AverageTimeResolutionWidget from '@/components/dashboard/widgets/AverageTimeResolutionWidget';

// Simple Error Boundary Component
class CaseViewErrorBoundary extends Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('CaseView Error Boundary caught an error:', error);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              There was an error rendering the case view. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const CaseView = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useDashboard();
  const { session } = useAuth();
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isManuallyTriggering, setIsManuallyTriggering] = useState(false);

  // Use the new hook for fetching case data
  const { data: caseViewData, isLoading, error, refetch } = useCaseViewData(caseId);

  // Analysis triggering disabled - backend API removed
  const handleTriggerAnalysis = useCallback(async () => {
    if (!caseId || !session || isManuallyTriggering) return;
    
    setIsManuallyTriggering(true);
    try {
      // Analysis triggering is disabled - only Supabase communication
      toast.info('Analysis triggering is currently disabled', {
        description: 'Case analysis is handled through Supabase only.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to trigger analysis:', error);
    } finally {
      setIsManuallyTriggering(false);
    }
  }, [caseId, session, isManuallyTriggering]);

  if (isLoading) {
     return (
       <div className="flex min-h-screen items-center justify-center">
         <div className="text-center">
           <div className="text-xl font-semibold mb-4">
             Loading case data...
           </div>
           <div className="text-sm text-gray-600">
             <div className="flex items-center justify-center space-x-2">
               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
               <span>Fetching case information</span>
             </div>
           </div>
         </div>
       </div>
     );
   }

  if (error || !caseViewData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Case</h1>
          <p className="text-gray-600 mb-6">
            {error?.message || 'The case you\'re looking for doesn\'t exist or failed to load.'}
          </p>
          <div className="space-x-4">
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from caseViewData
  const { case: caseData, plaintiffs, defendants, attorneys, legalIssues, evidence, documents, aiData, status } = caseViewData;

  // Transform the complete case data to match the expected format
  // Use useMemo to prevent recreation on every render
  const transformedCase = useMemo(() => {
    // Early return if caseData is not available
    if (!caseData || !caseData.caseDetails) {
      return {
        id: caseId || 'unknown',
        title: 'Loading...',
        status: 'Pending' as const,
        confidence: 65,
        date: new Date().toISOString().split('T')[0],
        risk: 'Medium' as const,
        potentialValue: 125000,
        daysActive: 0
      };
    }

    // Ensure aiData is defined with safe defaults
    const safeAiData = {
      predictions: aiData?.predictions || null,
      analysis: aiData?.analysis || null,
      enrichment: aiData?.enrichment || null
    };

    return {
      id: caseData.caseDetails.id,
      title: caseData.caseDetails.case_name || `Case ${caseData.caseDetails.case_number || caseData.caseDetails.id}`,
      status: caseData.caseDetails.case_stage === 'Settled' || caseData.caseDetails.case_stage === 'Dismissed' || caseData.caseDetails.case_stage === 'Closed' 
        ? 'Closed' as const
        : caseData.caseDetails.case_stage === 'Filed' || caseData.caseDetails.case_stage === 'Discovery' || caseData.caseDetails.case_stage === 'Trial'
        ? 'Active' as const
        : 'Pending' as const,
      confidence: getStableConfidence(safeAiData, caseData.caseDetails),
      date: caseData.caseDetails.date_filed || caseData.caseDetails.created_at.split('T')[0],
      risk: safeAiData.predictions?.risk_level || 
            safeAiData.analysis?.overallRisk ||
            (caseData.caseDetails.case_type === 'Medical Malpractice' || caseData.caseDetails.case_type === 'Product Liability') 
            ? 'High' as const
            : (caseData.caseDetails.case_type === 'Contract Dispute' || caseData.caseDetails.case_type === 'Employment')
            ? 'Low' as const
            : 'Medium' as const,
      potentialValue: getStablePotentialValue(safeAiData, caseData.caseDetails),
      daysActive: getStableDaysActive(safeAiData, caseData.caseDetails)
    };
  }, [
    caseData?.caseDetails?.id,
    caseData?.caseDetails?.case_name,
    caseData?.caseDetails?.case_number,
    caseData?.caseDetails?.case_stage,
    caseData?.caseDetails?.case_type,
    caseData?.caseDetails?.date_filed,
    caseData?.caseDetails?.created_at,
    // Only include primitive values from aiData to avoid object recreation issues
    aiData?.predictions?.confidence_prediction_percentage,
    aiData?.predictions?.estimated_financial_outcome,
    aiData?.predictions?.risk_level,
    aiData?.analysis?.confidence,
    aiData?.analysis?.overallRisk,
    aiData?.analysis?.estimatedValue,
    aiData?.analysis?.estimatedDays,
    caseId
  ]);

  // Helper functions for status colors
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper functions for calculations
  const getStableConfidence = (aiData: any, caseDetails: any) => {
    // First priority: Use actual analysis data
    if (aiData?.predictions?.confidence_prediction_percentage) {
      return aiData.predictions.confidence_prediction_percentage;
    }
    
    // Second priority: Use analysis confidence levels
    if (aiData?.analysis?.confidence) {
      switch (aiData.analysis.confidence) {
        case 'high': return 90;
        case 'medium': return 70;
        case 'low': return 50;
        default: break;
      }
    }
    
    // Third priority: Calculate based on case stage and type
    let baseConfidence = 65; // Default base confidence
    
    // Adjust based on case stage
    switch (caseDetails?.case_stage) {
      case 'Settled':
      case 'Closed':
        baseConfidence = 85;
        break;
      case 'Trial':
        baseConfidence = 75;
        break;
      case 'Discovery':
        baseConfidence = 70;
        break;
      case 'Filed':
        baseConfidence = 60;
        break;
      default:
        baseConfidence = 65;
    }
    
    // Adjust based on case type
    switch (caseDetails?.case_type) {
      case 'Contract Dispute':
        baseConfidence += 10;
        break;
      case 'Employment':
        baseConfidence += 5;
        break;
      case 'Medical Malpractice':
      case 'Product Liability':
        baseConfidence -= 10;
        break;
      case 'Personal Injury':
        baseConfidence -= 5;
        break;
    }
    
    // Ensure confidence is within reasonable bounds
    return Math.max(30, Math.min(95, baseConfidence));
  };

  const getStablePotentialValue = (aiData: any, caseDetails: any) => {
    if (aiData?.predictions?.estimated_financial_outcome) {
      return aiData.predictions.estimated_financial_outcome;
    }
    if (aiData?.analysis?.estimatedValue) {
      return aiData.analysis.estimatedValue;
    }
    
    // Base value on case type
    const baseValues = {
      'Contract Dispute': 150000,
      'Employment': 100000,
      'Personal Injury': 200000,
      'Medical Malpractice': 500000,
      'Product Liability': 300000,
      'Property Dispute': 75000
    };
    
    return baseValues[caseDetails?.case_type as keyof typeof baseValues] || 125000;
  };

  const getStableDaysActive = (aiData: any, caseDetails: any) => {
    if (aiData?.analysis?.estimatedDays) {
      return aiData.analysis.estimatedDays;
    }
    
    try {
      const createdDate = new Date(caseDetails?.created_at);
      const currentDate = new Date();
      return Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error('Error calculating days active:', error);
      return 0;
    }
  };

  const copyCaseId = async () => {
    try {
      await navigator.clipboard.writeText(transformedCase.id);
      setCopyFeedback(true);
      // Hide the feedback after 2 seconds
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy Case ID:', err);
    }
  };

  // Wrap the main render in a try-catch to prevent blank pages
  try {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    className="p-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{transformedCase.title}</h1>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">Case ID: {transformedCase.id}</p>
                      <div className="relative">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyCaseId}
                                className="h-6 w-6 p-0 hover:bg-gray-100"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy Case ID to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {copyFeedback && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap z-10 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                            ✓ Copied to clipboard!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(transformedCase.status)}>
                    {transformedCase.status}
                  </Badge>
                  <Badge className={getRiskColor(transformedCase.risk)}>
                    {transformedCase.risk} Risk
                  </Badge>
                  <Button
                    variant="ghost"
                    onClick={() => toggleFavorite(transformedCase.id)}
                    className={isFavorite(transformedCase.id) ? 'text-yellow-500' : 'text-gray-400'}
                  >
                    ★
                  </Button>
                </div>
              </div>
            </div>

            {/* Processing Status Notifications */}
            {status.processingStatus === 'pending' && !status.hasAiData && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <Play className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-blue-900">Ready for Analysis</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Your case is ready for AI analysis. Click the button below to start the linear pipeline processing.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTriggerAnalysis}
                    disabled={isManuallyTriggering}
                    className="ml-4"
                  >
                    {isManuallyTriggering ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {status.processingStatus === 'processing' && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <Loader2 className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 animate-spin" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-yellow-900">Linear Pipeline Processing</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your case is being processed through our comprehensive AI analysis pipeline. This includes PDF extraction, 
                      legal research, jurisdiction analysis, and prediction modeling. This typically takes 3-7 minutes to complete.
                    </p>
                    {status.lastAiUpdate && (
                      <p className="text-xs text-yellow-600 mt-2">
                        Last updated: {new Date(status.lastAiUpdate).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refetch}
                    className="ml-4"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            )}

            {status.processingStatus === 'completed' && status.hasAiData && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-green-900">Linear Pipeline Complete</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Comprehensive AI analysis has been completed. All insights, predictions, and recommendations are now available.
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={refetch}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {status.processingStatus === 'failed' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-900">Processing Failed</h3>
                    <p className="text-sm text-red-700 mt-1">
                      The AI analysis pipeline encountered an error. You can retry the analysis or contact support for assistance.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTriggerAnalysis}
                    disabled={isManuallyTriggering}
                    className="ml-4"
                  >
                    {isManuallyTriggering ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="parties">Parties</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Key Metrics */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="mr-2 h-5 w-5" />
                          Case Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{transformedCase.confidence}%</div>
                            <div className="text-sm text-gray-600">
                              {status.hasAiData ? 'Success Probability' : 'Preliminary Score'}
                            </div>
                            {aiData?.predictions?.confidence_prediction_percentage && (
                              <div className="text-xs text-gray-500 mt-1">
                                Confidence: {aiData.predictions.confidence_prediction_percentage}%
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              ${Math.round(transformedCase.potentialValue / 1000)}K
                            </div>
                            <div className="text-sm text-gray-600">
                              {aiData?.predictions?.estimated_financial_outcome ? 'AI Estimate' : 'Potential Value'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{transformedCase.daysActive}</div>
                            <div className="text-sm text-gray-600">Days Active</div>
                            {aiData?.predictions?.estimated_timeline && (
                              <div className="text-xs text-gray-500 mt-1">
                                Est. {aiData.predictions.estimated_timeline}
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{documents?.length || 0}</div>
                            <div className="text-sm text-gray-600">Documents</div>
                            {aiData?.predictions?.case_complexity_score && (
                              <div className="text-xs text-gray-500 mt-1">
                                Complexity: {Math.round(aiData.predictions.case_complexity_score)}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Case Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Overall Progress</span>
                              <span>{transformedCase.confidence}%</span>
                            </div>
                            <Progress value={transformedCase.confidence} className="h-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <span>Initial Filing</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <span>Discovery</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>Pre-trial</span>
                            </div>
                            <div className="flex items-center">
                              <AlertTriangle className="mr-2 h-4 w-4 text-gray-400" />
                              <span>Trial</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Add Document
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Event
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <User className="mr-2 h-4 w-4" />
                          Add Party
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Update Settlement
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Case Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Filed Date:</span>
                          <span>{transformedCase.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Court:</span>
                          <span>Superior Court</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Judge:</span>
                          <span>Hon. Sarah Johnson</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Case Type:</span>
                          <span>Civil Litigation</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Predicted Case Outcome */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Predicted Case Outcome</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PredictedOutcomeWidget caseId={caseId} />
                    </CardContent>
                  </Card>

                  {/* Case Complexity & Risk Score */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Case Complexity & Risk Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CaseComplexityRiskWidget caseId={caseId} />
                    </CardContent>
                  </Card>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RiskAssessmentWidget caseId={caseId} />
                    </CardContent>
                  </Card>

                  {/* Precedent Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Precedent Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PrecedentAnalysisWidget caseId={caseId} />
                    </CardContent>
                  </Card>

                  {/* Judge & Lawyer Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Judge & Lawyer Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <JudgeAnalysisWidget caseId={caseId} />
                        <div className="border-t pt-4">
                          <LawyerAnalysisWidget caseId={caseId} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Settlement vs Trial Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Settlement vs Trial Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SettlementVsTrialAnalysisWidget caseId={caseId} />
                    </CardContent>
                  </Card>

                  {/* AI Strategy Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Strategy Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AIStrategyRecommendationsWidget caseId={caseId} />
                    </CardContent>
                  </Card>

                  {/* Analysis Status Indicator */}
                  {!status.aiProcessed && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="mr-2 h-5 w-5" />
                          Analysis Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AnalysisStatusIndicator
                          status={status.processingStatus as 'loading' | 'pending' | 'partial' | 'complete' | 'failed'}
                          hasAnyData={status.hasAiData}
                          errors={[]}
                          onRefresh={refetch}
                          lastUpdated={status.lastAiUpdate ? new Date(status.lastAiUpdate) : null}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Fact Strength Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Fact Strength Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FactStrengthAnalysisWidget />
                    </CardContent>
                  </Card>

                  {/* Average Time for Resolution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Average Time for Resolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AverageTimeResolutionWidget />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Case Filed</h4>
                            <span className="text-sm text-gray-500">{transformedCase.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Initial complaint filed with the court</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Service of Process</h4>
                            <span className="text-sm text-gray-500">2023-08-20</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Defendant served with complaint</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Answer Filed</h4>
                            <span className="text-sm text-gray-500">2023-09-05</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Defendant filed answer to complaint</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-500">Discovery Period</h4>
                            <span className="text-sm text-gray-500">Ongoing</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Document production and depositions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents && documents.length > 0 ? (
                        documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <div className="font-medium">{doc.file_name || `Document ${index + 1}`}</div>
                                <div className="text-sm text-gray-500">
                                  {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Unknown date'}
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No documents uploaded yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Outcome Prediction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">{transformedCase.confidence}%</div>
                        <div className="text-sm text-gray-600">Likelihood of Success</div>
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-800">Recommended Strategy</div>
                          <div className="text-sm text-blue-600 mt-1">Focus on settlement negotiations given strong evidence</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Legal Risk</span>
                            <span>Medium</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Financial Risk</span>
                            <span>Low</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Reputational Risk</span>
                            <span>High</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Parties Tab */}
              <TabsContent value="parties" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Plaintiffs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {plaintiffs && plaintiffs.length > 0 ? (
                        <div className="space-y-3">
                          {plaintiffs.map((plaintiff, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="font-medium">{plaintiff.name || 'Unknown Plaintiff'}</div>
                              <div className="text-sm text-gray-600">
                                {plaintiff.type || 'Individual'}
                              </div>
                              {plaintiff.attorney && (
                                <div className="text-sm text-gray-500 mt-1">
                                  Attorney: {plaintiff.attorney}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No plaintiff information available</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Defendants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {defendants && defendants.length > 0 ? (
                        <div className="space-y-3">
                          {defendants.map((defendant, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="font-medium">{defendant.name || 'Unknown Defendant'}</div>
                              <div className="text-sm text-gray-600">
                                {defendant.type || 'Individual'}
                              </div>
                              {defendant.attorney && (
                                <div className="text-sm text-gray-500 mt-1">
                                  Attorney: {defendant.attorney}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No defendant information available</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering CaseView:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            There was an error rendering the case view. Please try refreshing the page.
          </p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

// Wrap the CaseView component with error boundary
const CaseViewWithErrorBoundary = () => {
  const handleError = (error: Error) => {
    console.error('CaseView error caught by boundary:', error);
  };

  return (
    <CaseViewErrorBoundary onError={handleError}>
      <CaseView />
    </CaseViewErrorBoundary>
  );
};

export default CaseViewWithErrorBoundary; 