import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User, Building, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp, BarChart3, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDashboard } from '@/contexts/DashboardContext';
import { fetchCompleteCase } from '@/utils/case/caseFetching';
import { useState, useEffect } from 'react';
import { CompleteCase } from '@/utils/case/types';
import { useCaseAnalysis } from '@/hooks/useCaseAnalysis';
import AnalysisStatusIndicator from '@/components/dashboard/AnalysisStatusIndicator';

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

const CaseView = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useDashboard();
  const [caseData, setCaseData] = useState<CompleteCase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Add the case analysis hook
  const analysisData = useCaseAnalysis(caseId);

  useEffect(() => {
    const loadCase = async () => {
      if (!caseId) return;
      
      setIsLoading(true);
      try {
        const completeCase = await fetchCompleteCase(caseId);
        setCaseData(completeCase);
      } catch (error) {
        console.error('Error loading case:', error);
        setCaseData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCase();
  }, [caseId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading case...</div>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Not Found</h1>
          <p className="text-gray-600 mb-6">The case you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Transform the complete case data to match the expected format
  const transformedCase = {
    id: caseData.caseDetails.id,
    title: caseData.caseDetails.case_name || `Case ${caseData.caseDetails.case_number || caseData.caseDetails.id}`,
    status: caseData.caseDetails.case_stage === 'Settled' || caseData.caseDetails.case_stage === 'Dismissed' || caseData.caseDetails.case_stage === 'Closed' 
      ? 'Closed' as const
      : caseData.caseDetails.case_stage === 'Filed' || caseData.caseDetails.case_stage === 'Discovery' || caseData.caseDetails.case_stage === 'Trial'
      ? 'Active' as const
      : 'Pending' as const,
    // Use real confidence from predictions or fallback
    confidence: analysisData.predictions?.confidence_prediction_percentage || 
                analysisData.probability?.confidence === 'high' ? 90 :
                analysisData.probability?.confidence === 'medium' ? 70 :
                analysisData.probability?.confidence === 'low' ? 50 :
                Math.floor(Math.random() * 40) + 60,
    date: caseData.caseDetails.date_filed || caseData.caseDetails.created_at.split('T')[0],
    // Use real risk level from backend or fallback
    risk: analysisData.predictions?.risk_level || 
          analysisData.riskAssessment?.overallRisk ||
          (caseData.caseDetails.case_type === 'Medical Malpractice' || caseData.caseDetails.case_type === 'Product Liability') 
          ? 'High' as const
          : (caseData.caseDetails.case_type === 'Contract Dispute' || caseData.caseDetails.case_type === 'Employment')
          ? 'Low' as const
          : 'Medium' as const,
    // Add real financial data
    potentialValue: analysisData.predictions?.estimated_financial_outcome || 
                   analysisData.financialPrediction?.estimatedValue || 125000,
    // Add real timeline data
    daysActive: analysisData.timelineEstimate?.estimatedDays ||
               Math.floor((new Date().getTime() - new Date(caseData.caseDetails.created_at).getTime()) / (1000 * 60 * 60 * 24))
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                            {analysisData.isAnalysisComplete ? 'AI Confidence' : 'Preliminary Score'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            ${Math.round(transformedCase.potentialValue / 1000)}K
                          </div>
                          <div className="text-sm text-gray-600">
                            {analysisData.predictions?.estimated_financial_outcome ? 'AI Estimate' : 'Potential Value'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{transformedCase.daysActive}</div>
                          <div className="text-sm text-gray-600">Days Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{caseData.documents.length}</div>
                          <div className="text-sm text-gray-600">Documents</div>
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
                {!analysisData.isAnalysisComplete && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Analysis Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AnalysisStatusIndicator
                        status={analysisData.analysisStatus as 'loading' | 'pending' | 'partial' | 'complete' | 'failed'}
                        hasAnyData={analysisData.hasAnyData}
                        errors={analysisData.errors}
                        onRefresh={analysisData.refreshAnalysis}
                        lastUpdated={analysisData.lastUpdated}
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
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium">Complaint.pdf</div>
                          <div className="text-sm text-gray-500">Filed on {transformedCase.date}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-medium">Answer.pdf</div>
                          <div className="text-sm text-gray-500">Filed on 2023-09-05</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-medium">Discovery_Request.pdf</div>
                          <div className="text-sm text-gray-500">Filed on 2023-09-15</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
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
                    <CardTitle>Plaintiff</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium">John Johnson</div>
                        <div className="text-sm text-gray-600">Individual</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Represented by:</div>
                        <div>Smith & Associates Law Firm</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Contact:</div>
                        <div>john.johnson@email.com</div>
                        <div>(555) 123-4567</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Defendant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium">MedTech Inc.</div>
                        <div className="text-sm text-gray-600">Corporation</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Represented by:</div>
                        <div>Johnson & Partners LLP</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Contact:</div>
                        <div>legal@medtech.com</div>
                        <div>(555) 987-6543</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaseView; 