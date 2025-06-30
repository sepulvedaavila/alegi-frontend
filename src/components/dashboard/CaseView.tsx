import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User, Building, AlertTriangle, CheckCircle, Clock, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDashboard } from '@/contexts/DashboardContext';
import { mockCases } from '@/data/mockCases';

const CaseView = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { selectedCase, toggleFavorite, isFavorite } = useDashboard();

  // Find the case from mock data (in real app, this would come from API)
  const caseData = mockCases.find(c => c.id === caseId) || selectedCase;

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
                  <h1 className="text-3xl font-bold text-gray-900">{caseData.title}</h1>
                  <p className="text-gray-600">Case ID: {caseData.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(caseData.status)}>
                  {caseData.status}
                </Badge>
                <Badge className={getRiskColor(caseData.risk)}>
                  {caseData.risk} Risk
                </Badge>
                <Button
                  variant="ghost"
                  onClick={() => toggleFavorite(caseData.id)}
                  className={isFavorite(caseData.id) ? 'text-yellow-500' : 'text-gray-400'}
                >
                  ★
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
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
                          <div className="text-2xl font-bold text-blue-600">{caseData.confidence}%</div>
                          <div className="text-sm text-gray-600">Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">$125K</div>
                          <div className="text-sm text-gray-600">Potential Value</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">45</div>
                          <div className="text-sm text-gray-600">Days Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">12</div>
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
                            <span>{caseData.confidence}%</span>
                          </div>
                          <Progress value={caseData.confidence} className="h-2" />
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
                        <span>{caseData.date}</span>
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
                          <span className="text-sm text-gray-500">{caseData.date}</span>
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
                          <div className="text-sm text-gray-500">Filed on {caseData.date}</div>
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
                      <div className="text-4xl font-bold text-blue-600 mb-2">{caseData.confidence}%</div>
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