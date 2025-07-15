import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Scale,
  Briefcase,
  Calendar
} from 'lucide-react';

interface SettlementAnalysis {
  settlementAdvantages: string[];
  trialAdvantages: string[];
  costComparison: {
    settlement: number;
    trial: number;
  };
  timeComparison: {
    settlementMonths: number;
    trialMonths: number;
  };
  recommendation: string;
  confidenceScore: number;
  financialExposure: {
    best: number;
    likely: number;
    worst: number;
  };
}

interface SettlementAnalysisComponentProps {
  data: SettlementAnalysis;
  loading?: boolean;
  error?: Error | null;
}

export const SettlementAnalysisComponent: React.FC<SettlementAnalysisComponentProps> = ({
  data,
  loading = false,
  error = null
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.toLowerCase().includes('settlement')) {
      return 'bg-blue-100 text-blue-800';
    }
    if (recommendation.toLowerCase().includes('trial')) {
      return 'bg-purple-100 text-purple-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const costSavings = data.costComparison.trial - data.costComparison.settlement;
  const timeSavings = data.timeComparison.trialMonths - data.timeComparison.settlementMonths;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Settlement vs Trial Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
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
          <CardTitle>Settlement vs Trial Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to load settlement analysis. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5" />
            <span>Settlement vs Trial Analysis</span>
          </CardTitle>
          <Badge className={getRecommendationColor(data.recommendation)}>
            {data.recommendation}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="financial">Financial Impact</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Settlement Advantages */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span>Settlement Advantages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.settlementAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Trial Advantages */}
              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Scale className="h-4 w-4 text-purple-600" />
                    <span>Trial Advantages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.trialAdvantages.map((advantage, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Comparison Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600">Cost Savings (Settlement)</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(costSavings)}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">Time Savings (Settlement)</p>
                <p className="text-xl font-bold text-blue-600">
                  {timeSavings} months
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Financial Impact Tab */}
          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cost Comparison */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Estimated Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Settlement</span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(data.costComparison.settlement)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Trial</span>
                      <span className="text-lg font-bold text-purple-600">
                        {formatCurrency(data.costComparison.trial)}
                      </span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Potential Savings</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(costSavings)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Exposure */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Financial Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Best Case</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(data.financialExposure.best)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Likely Outcome</span>
                      <span className="text-lg font-bold text-yellow-600">
                        {formatCurrency(data.financialExposure.likely)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Worst Case</span>
                      <span className="text-lg font-bold text-red-600">
                        {formatCurrency(data.financialExposure.worst)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cost Breakdown Visualization */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Cost Comparison Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Settlement Costs</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(data.costComparison.settlement)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ 
                          width: `${(data.costComparison.settlement / data.costComparison.trial) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Trial Costs</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(data.costComparison.trial)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Settlement Timeline */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Settlement Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold text-blue-600">
                      {data.timeComparison.settlementMonths}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">months to resolution</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Faster resolution</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Lower ongoing costs</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Predictable timeline</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trial Timeline */}
              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Trial Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold text-purple-600">
                      {data.timeComparison.trialMonths}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">months to resolution</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Extended timeline</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Potential delays</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>Higher ongoing costs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline Visualization */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resolution Timeline Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  
                  {/* Settlement Milestone */}
                  <div className="relative pl-8 pb-8">
                    <div className="absolute left-0 top-1 w-2 h-2 bg-blue-600 rounded-full -translate-x-1/2"></div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900">Settlement Resolution</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {data.timeComparison.settlementMonths} months
                      </p>
                    </div>
                  </div>

                  {/* Trial Milestone */}
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-2 h-2 bg-purple-600 rounded-full -translate-x-1/2"></div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900">Trial Resolution</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        {data.timeComparison.trialMonths} months
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Confidence Score */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Analysis Confidence</span>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-6 rounded ${
                      level <= Math.round(data.confidenceScore / 20)
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold">{data.confidenceScore}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettlementAnalysisComponent;

export type { SettlementAnalysis, SettlementAnalysisComponentProps };