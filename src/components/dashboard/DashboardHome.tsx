import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Users, BarChart3, Calendar } from 'lucide-react';
import DashboardHeader from './header/DashboardHeader';
import ExportMenu from './header/ExportMenu';
import DashboardContent from './content/DashboardContent';
import NewCaseModal from '@/components/cases/NewCaseModal';
import { useDashboard } from '@/contexts/DashboardContext';

const DashboardHome = () => {
  const { recentCases, toggleFavorite, isFavorite, isLoadingCases } = useDashboard();
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Open the new case modal
  const handleNewCase = () => {
    setIsNewCaseModalOpen(true);
  };

  // Navigate to case detail view
  const handleCaseClick = (caseId: string) => {
    navigate(`/dashboard/case/${caseId}`);
  };

  // Calculate dashboard statistics from real user cases
  const totalCases = recentCases.length;
  const activeCases = recentCases.filter(c => c.status === 'Active').length;
  const pendingCases = recentCases.filter(c => c.status === 'Pending').length;
  const closedCases = recentCases.filter(c => c.status === 'Closed').length;
  const averageConfidence = totalCases > 0 ? Math.round(recentCases.reduce((sum, c) => sum + c.confidence, 0) / totalCases) : 0;
  const highRiskCases = recentCases.filter(c => c.risk === 'High').length;

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
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <DashboardHeader 
              isFavorite={false} 
              onFavoriteToggle={() => {}} 
            />
            <div className="flex items-center gap-3">
              <Button
                onClick={handleNewCase}
                className="bg-alegi-blue hover:bg-blue-700 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Case
              </Button>
              <ExportMenu dashboardRef={dashboardRef} />
            </div>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Cases</p>
                    <p className="text-3xl font-bold text-gray-900">{totalCases}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Cases</p>
                    <p className="text-3xl font-bold text-blue-600">{activeCases}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
                    <p className="text-3xl font-bold text-purple-600">{averageConfidence}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Risk Cases</p>
                    <p className="text-3xl font-bold text-red-600">{highRiskCases}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Cases Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Recent Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingCases ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-gray-500">Loading cases...</div>
                    </div>
                  ) : recentCases.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-4">No cases created yet</p>
                      <Button onClick={handleNewCase} className="bg-alegi-blue hover:bg-blue-700 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Your First Case
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentCases.slice(0, 3).map((caseItem) => (
                        <div 
                          key={caseItem.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleCaseClick(caseItem.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{caseItem.title}</h4>
                                <p className="text-sm text-gray-500">ID: {caseItem.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge className={getStatusColor(caseItem.status)}>
                                {caseItem.status}
                              </Badge>
                              <Badge className={getRiskColor(caseItem.risk)}>
                                {caseItem.risk} Risk
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {caseItem.confidence}% confidence
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(caseItem.id);
                              }}
                              className={isFavorite(caseItem.id) ? 'text-yellow-500' : 'text-gray-400'}
                            >
                              ★
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Active</span>
                      </div>
                      <span className="text-sm font-medium">{activeCases}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">{pendingCases}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Closed</span>
                      </div>
                      <span className="text-sm font-medium">{closedCases}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={handleNewCase}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Case
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Parties
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Settlement Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <DashboardContent dashboardRef={dashboardRef} />
          </div>
        </div>
      </div>

      <NewCaseModal 
        isOpen={isNewCaseModalOpen} 
        onClose={() => setIsNewCaseModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardHome;
