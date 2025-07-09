import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User, Building, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp, BarChart3, Copy, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useCaseViewData } from '@/hooks/useCaseViewData';

// Import case insights widgets
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

// Import new enhanced components
import CaseProcessingStatus from '@/components/cases/CaseProcessingStatus';
import EnhancedCaseData from '@/components/cases/EnhancedCaseData';

const CaseViewNew = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useDashboard();
  const { session } = useAuth();
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Use the new hook for fetching case data
  const { data: caseViewData, isLoading, error, refetch } = useCaseViewData(caseId);

  // Handle copy case ID
  const handleCopyCaseId = () => {
    if (caseId) {
      navigator.clipboard.writeText(caseId);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  // Helper functions for status colors
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'filed':
      case 'discovery':
      case 'trial':
        return 'bg-green-100 text-green-800';
      case 'closed':
      case 'settled':
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold mb-4">Loading case data...</div>
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

  // Error state
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

  const { case: caseData, plaintiffs, defendants, attorneys, legalIssues, evidence, documents, aiData, status } = caseViewData;

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
                  <h1 className="text-3xl font-bold text-gray-900">
                    {caseData.case_name || `Case ${caseData.case_number || caseId}`}
                  </h1>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-gray-600">Case ID: {caseId}</p>
                    <TooltipProvider>
                      <Tooltip open={copyFeedback}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyCaseId}
                            className="p-1"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copyFeedback ? 'Copied!' : 'Copy case ID'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant={isFavorite(caseId!) ? "default" : "outline"}
                  onClick={() => toggleFavorite(caseId!)}
                  className="p-2"
                >
                  {isFavorite(caseId!) ? '⭐ Favorited' : '☆ Favorite'}
                </Button>
                <Button onClick={() => refetch()} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="enhanced">Enhanced Analysis</TabsTrigger>
              <TabsTrigger value="details">Case Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Processing Status Banner */}
            {status.processingStatus === 'processing' && (
              <div className="mb-6">
                <CaseProcessingStatus caseId={caseId!} />
              </div>
            )}

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                    <FileText className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(caseData.case_stage)}>
                      {caseData.case_stage || 'Pending'}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Case Type</CardTitle>
                    <Building className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{caseData.case_type || 'Not specified'}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Filing Date</CardTitle>
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">
                      {caseData.date_filed ? new Date(caseData.date_filed).toLocaleDateString() : 'Not filed'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Analysis Status */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Processing Status</p>
                        <p className="text-sm text-gray-600">
                          {status.processingStatus === 'processing' ? 'Analysis in progress...' :
                           status.processingStatus === 'completed' ? 'Analysis complete' :
                           status.processingStatus === 'failed' ? 'Analysis failed' :
                           'Not started'}
                        </p>
                      </div>
                      {status.processingStatus === 'processing' ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      ) : status.hasAiData ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    
                    {status.lastAiUpdate && (
                      <p className="text-sm text-gray-600">
                        Last updated: {new Date(status.lastAiUpdate).toLocaleString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis Widgets */}
              {status.hasAiData ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PredictedOutcomeWidget caseId={caseId} />
                  <CaseComplexityRiskWidget caseId={caseId} />
                  <RiskAssessmentWidget caseId={caseId} />
                  <PrecedentAnalysisWidget caseId={caseId} />
                  <JudgeAnalysisWidget caseId={caseId} />
                  <SettlementVsTrialAnalysisWidget caseId={caseId} />
                  <AverageTimeResolutionWidget caseData={caseData} />
                </div>
              ) : status.processingStatus === 'processing' ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg font-semibold mb-2">AI Analysis in Progress</h3>
                    <p className="text-gray-600 mb-6">
                      Your case is being analyzed by our AI system. This typically takes 3-7 minutes to complete.
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span className="text-sm text-gray-500">Processing...</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">AI Analysis Pending</h3>
                    <p className="text-gray-600 mb-6">
                      AI analysis will be automatically triggered for your case. Please check back in a few minutes.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Parties */}
              <Card>
                <CardHeader>
                  <CardTitle>Parties Involved</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Plaintiffs</h4>
                    <div className="flex flex-wrap gap-2">
                      {plaintiffs.length > 0 ? (
                        plaintiffs.map((plaintiff) => (
                          <Badge key={plaintiff.id} variant="outline">
                            <User className="mr-1 h-3 w-3" />
                            {plaintiff.name}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">No plaintiffs recorded</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Defendants</h4>
                    <div className="flex flex-wrap gap-2">
                      {defendants.length > 0 ? (
                        defendants.map((defendant) => (
                          <Badge key={defendant.id} variant="outline">
                            <User className="mr-1 h-3 w-3" />
                            {defendant.name}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">No defendants recorded</span>
                      )}
                    </div>
                  </div>
                  {attorneys.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Attorneys</h4>
                      <div className="flex flex-wrap gap-2">
                        {attorneys.map((attorney) => (
                          <Badge key={attorney.id} variant="outline">
                            <User className="mr-1 h-3 w-3" />
                            {attorney.name} {attorney.bar_id && `(Bar: ${attorney.bar_id})`}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Analysis Tab */}
            <TabsContent value="enhanced" className="space-y-6">
              <EnhancedCaseData caseId={caseId!} />
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Case Narrative</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {caseData.case_narrative || 'No narrative provided'}
                    </p>
                  </div>
                  
                  {caseData.history_narrative && (
                    <div>
                      <h4 className="font-semibold mb-1">History</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{caseData.history_narrative}</p>
                    </div>
                  )}
                  
                  {caseData.applicable_law && (
                    <div>
                      <h4 className="font-semibold mb-1">Applicable Law</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{caseData.applicable_law}</p>
                    </div>
                  )}
                  
                  {caseData.expected_outcome && (
                    <div>
                      <h4 className="font-semibold mb-1">Expected Outcome</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{caseData.expected_outcome}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-1">Jurisdiction</h4>
                      <p className="text-gray-700">{caseData.jurisdiction || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Case Number</h4>
                      <p className="text-gray-700">{caseData.case_number || 'Not assigned'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {legalIssues.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Legal Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {legalIssues.map((issue) => (
                        <div key={issue.id} className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-gray-700">{issue.issue}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.length > 0 ? (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="font-medium">{doc.file_name}</p>
                              <p className="text-sm text-gray-600">
                                {doc.file_type} • {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No documents uploaded</p>
                  )}
                </CardContent>
              </Card>

              {evidence.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {evidence.map((item) => (
                        <div key={item.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{item.type}</p>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaseViewNew;