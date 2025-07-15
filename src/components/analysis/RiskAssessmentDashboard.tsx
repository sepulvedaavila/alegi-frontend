import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Info,
  Target,
  FileText,
  Scale,
  Clock,
  DollarSign
} from 'lucide-react';

interface RiskFactor {
  category: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
  impact: number;
  mitigation?: string;
}

interface RiskAssessment {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  weaknesses: string[];
  recommendations: string[];
  riskFactors: RiskFactor[];
  overallConfidence: number;
  mitigationStrategies: {
    immediate: string[];
    longTerm: string[];
  };
}

interface RiskAssessmentDashboardProps {
  data: RiskAssessment;
  loading?: boolean;
  error?: Error | null;
}

export const RiskAssessmentDashboard: React.FC<RiskAssessmentDashboardProps> = ({
  data,
  loading = false,
  error = null
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: 'text-red-600'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-600'
        };
      case 'low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-600'
        };
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <Info className="h-5 w-5" />;
      case 'low':
        return <Shield className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to load risk assessment data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const riskColors = getRiskColor(data.riskLevel);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Risk Assessment Dashboard</span>
          </CardTitle>
          <Badge className={`${riskColors.bg} ${riskColors.text}`}>
            {data.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
            <TabsTrigger value="recommendations">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Risk Score Card */}
            <Card className={`border-2 ${riskColors.border}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Overall Risk Score</CardTitle>
                  <div className={`p-2 rounded-full ${riskColors.bg}`}>
                    <div className={riskColors.icon}>
                      {getRiskIcon(data.riskLevel)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold" style={{ color: riskColors.icon.replace('text-', '') }}>
                      {data.riskScore}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">out of 100</p>
                  </div>
                  
                  <Progress 
                    value={data.riskScore} 
                    className="h-3"
                    style={{ 
                      '--progress-background': 
                        data.riskScore >= 80 ? '#ef4444' : 
                        data.riskScore >= 60 ? '#f59e0b' : 
                        data.riskScore >= 40 ? '#f97316' : '#10b981'
                    } as React.CSSProperties}
                  />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Low Risk</p>
                      <p className="text-sm font-medium text-green-600">0-40</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Medium Risk</p>
                      <p className="text-sm font-medium text-yellow-600">41-70</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">High Risk</p>
                      <p className="text-sm font-medium text-red-600">71-100</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">Critical Weaknesses</p>
                      <p className="text-2xl font-bold">{data.weaknesses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Target className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Risk Factors</p>
                      <p className="text-2xl font-bold">{data.riskFactors.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Confidence</p>
                      <p className="text-2xl font-bold">{data.overallConfidence}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Critical Weaknesses */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span>Critical Weaknesses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Factors Tab */}
          <TabsContent value="factors" className="space-y-4">
            <div className="space-y-4">
              {data.riskFactors.map((factor, index) => {
                const factorColors = getRiskColor(factor.risk);
                return (
                  <Card key={index} className={`border ${factorColors.border}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1.5 rounded ${factorColors.bg}`}>
                            <div className={factorColors.icon}>
                              {getRiskIcon(factor.risk)}
                            </div>
                          </div>
                          <CardTitle className="text-base">{factor.category}</CardTitle>
                        </div>
                        <Badge className={`${factorColors.bg} ${factorColors.text}`}>
                          {factor.risk.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-3">{factor.description}</p>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Impact Level</span>
                        <span className="text-sm font-bold">{factor.impact}/10</span>
                      </div>
                      <Progress value={factor.impact * 10} className="h-2 mb-3" />
                      
                      {factor.mitigation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                          <p className="text-sm font-medium text-blue-900 mb-1">Mitigation Strategy</p>
                          <p className="text-sm text-blue-800">{factor.mitigation}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Mitigation Tab */}
          <TabsContent value="mitigation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Immediate Actions */}
              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>Immediate Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.mitigationStrategies.immediate.map((strategy, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Long-term Strategies */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Long-term Strategies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.mitigationStrategies.longTerm.map((strategy, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Risk Mitigation Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Risk Mitigation Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-red-600" />
                      <p className="text-sm text-gray-600">Current Risk</p>
                      <p className="text-xl font-bold text-red-600">{data.riskScore}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <TrendingDown className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <p className="text-sm text-gray-600">With Immediate Actions</p>
                      <p className="text-xl font-bold text-yellow-600">
                        {Math.max(20, data.riskScore - 25)}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm text-gray-600">With Full Mitigation</p>
                      <p className="text-xl font-bold text-green-600">
                        {Math.max(10, data.riskScore - 45)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Recommended Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Action Item {index + 1}
                        </p>
                        <p className="text-sm text-blue-800">{recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Priority Matrix */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Action Priority Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">High Priority</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Address critical weaknesses</li>
                      <li>• Implement immediate mitigations</li>
                      <li>• Document risk factors</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Medium Priority</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Develop long-term strategies</li>
                      <li>• Monitor risk indicators</li>
                      <li>• Review mitigation effectiveness</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RiskAssessmentDashboard;

export type { RiskAssessment, RiskFactor, RiskAssessmentDashboardProps };