import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Users, Calendar, Target } from 'lucide-react';
import { mockCases } from '@/data/mockCases';

const DashboardOverviewWidget = () => {
  // Calculate dashboard statistics
  const totalCases = mockCases.length;
  const activeCases = mockCases.filter(c => c.status === 'Active').length;
  const pendingCases = mockCases.filter(c => c.status === 'Pending').length;
  const closedCases = mockCases.filter(c => c.status === 'Closed').length;
  const averageConfidence = Math.round(mockCases.reduce((sum, c) => sum + c.confidence, 0) / totalCases);
  const highRiskCases = mockCases.filter(c => c.risk === 'High').length;
  const mediumRiskCases = mockCases.filter(c => c.risk === 'Medium').length;
  const lowRiskCases = mockCases.filter(c => c.risk === 'Low').length;

  // Calculate success rate (cases with confidence > 70%)
  const successfulCases = mockCases.filter(c => c.confidence > 70).length;
  const successRate = Math.round((successfulCases / totalCases) * 100);

  // Mock financial data
  const totalEstimatedValue = totalCases * 150000; // Mock average case value
  const totalSettledValue = closedCases * 120000; // Mock average settlement
  const averageResolutionTime = 45; // Mock days

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{totalCases}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{successRate}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
                <p className="text-2xl font-bold text-purple-600">{averageConfidence}%</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Cases</p>
                <p className="text-2xl font-bold text-red-600">{highRiskCases}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Case Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Active Cases</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{activeCases}</span>
                  <span className="text-xs text-gray-500">({Math.round((activeCases / totalCases) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(activeCases / totalCases) * 100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Pending Cases</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{pendingCases}</span>
                  <span className="text-xs text-gray-500">({Math.round((pendingCases / totalCases) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(pendingCases / totalCases) * 100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Closed Cases</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{closedCases}</span>
                  <span className="text-xs text-gray-500">({Math.round((closedCases / totalCases) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(closedCases / totalCases) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Risk Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Low Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{lowRiskCases}</span>
                  <span className="text-xs text-gray-500">({Math.round((lowRiskCases / totalCases) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(lowRiskCases / totalCases) * 100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{mediumRiskCases}</span>
                  <span className="text-xs text-gray-500">({Math.round((mediumRiskCases / totalCases) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(mediumRiskCases / totalCases) * 100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">High Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{highRiskCases}</span>
                  <span className="text-xs text-gray-500">({Math.round((highRiskCases / totalCases) * 100)}%)</span>
                </div>
              </div>
              <Progress value={(highRiskCases / totalCases) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${(totalEstimatedValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Total Estimated Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${(totalSettledValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Total Settled Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {averageResolutionTime}
              </div>
              <div className="text-sm text-gray-600">Avg. Resolution Days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverviewWidget; 