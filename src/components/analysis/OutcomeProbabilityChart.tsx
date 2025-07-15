import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProbabilityData {
  successProbability: number;
  failureProbability: number;
  settlementProbability: number;
  confidence: 'low' | 'medium' | 'high';
}

interface OutcomeProbabilityChartProps {
  data: ProbabilityData;
  loading?: boolean;
  error?: Error | null;
}

export const OutcomeProbabilityChart: React.FC<OutcomeProbabilityChartProps> = ({ 
  data, 
  loading = false, 
  error = null 
}) => {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityIcon = (probability: number) => {
    if (probability >= 70) return <TrendingUp className="h-5 w-5 text-green-600" />;
    if (probability >= 40) return <Minus className="h-5 w-5 text-yellow-600" />;
    return <TrendingDown className="h-5 w-5 text-red-600" />;
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'bg-green-500';
    if (probability >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Outcome Probability Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Outcome Probability Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>Unable to load probability analysis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Outcome Probability Analysis</CardTitle>
          <Badge className={getConfidenceColor(data.confidence)}>
            {data.confidence.toUpperCase()} Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Success Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getProbabilityIcon(data.successProbability)}
              <span className="font-medium">Success Likelihood</span>
            </div>
            <span className="text-2xl font-bold">{data.successProbability}%</span>
          </div>
          <Progress value={data.successProbability} className="h-3" />
          <p className="text-sm text-gray-600">
            Probability of favorable outcome based on case merits and precedents
          </p>
        </div>

        {/* Failure Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getProbabilityIcon(100 - data.failureProbability)}
              <span className="font-medium">Failure Risk</span>
            </div>
            <span className="text-2xl font-bold">{data.failureProbability}%</span>
          </div>
          <Progress 
            value={data.failureProbability} 
            className="h-3"
            style={{ 
              '--progress-background': data.failureProbability > 50 ? '#ef4444' : '#f59e0b' 
            } as React.CSSProperties}
          />
          <p className="text-sm text-gray-600">
            Risk of unfavorable judgment or dismissal
          </p>
        </div>

        {/* Settlement Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Minus className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Settlement Likelihood</span>
            </div>
            <span className="text-2xl font-bold">{data.settlementProbability}%</span>
          </div>
          <Progress 
            value={data.settlementProbability} 
            className="h-3"
            style={{ '--progress-background': '#3b82f6' } as React.CSSProperties}
          />
          <p className="text-sm text-gray-600">
            Probability of reaching a negotiated settlement
          </p>
        </div>

        {/* Visual Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">Outcome Distribution</h4>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`h-8 ${getProbabilityColor(data.successProbability)} rounded-l transition-all duration-300`}
                    style={{ width: `${data.successProbability}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Success: {data.successProbability}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className="h-8 bg-blue-500 transition-all duration-300"
                    style={{ width: `${data.settlementProbability}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settlement: {data.settlementProbability}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`h-8 ${getProbabilityColor(100 - data.failureProbability)} rounded-r transition-all duration-300`}
                    style={{ width: `${data.failureProbability}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Failure: {data.failureProbability}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Success</span>
            <span>Settlement</span>
            <span>Failure</span>
          </div>
        </div>

        {/* Confidence Explanation */}
        <div className="text-sm text-gray-600 mt-4">
          <p className="font-medium mb-1">Confidence Level: {data.confidence.toUpperCase()}</p>
          <p>
            {data.confidence === 'high' && 'Analysis based on extensive precedent data and clear case factors.'}
            {data.confidence === 'medium' && 'Analysis based on moderate precedent data with some uncertainty.'}
            {data.confidence === 'low' && 'Limited precedent data available. Results should be interpreted with caution.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutcomeProbabilityChart;

// Export types
export type { ProbabilityData, OutcomeProbabilityChartProps };