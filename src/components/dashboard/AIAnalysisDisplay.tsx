import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  Target,
  CheckCircle,
  Info,
  Scale,
  BarChart3
} from 'lucide-react';

interface AIAnalysisDisplayProps {
  aiData: {
    enrichment: {
      id: string;
      case_id: string;
      enrichment_data: {
        case_complexity: string;
        estimated_duration: string;
        key_legal_issues: string[];
        recommended_strategies: string[];
        risk_factors: string[];
      };
      created_at: string;
    };
    predictions: {
      id: string;
      case_id: string;
      outcome_prediction_score: number;
      confidence_prediction_percentage: number;
      settlement_probability: number;
      estimated_settlement_range: {
        low: number;
        likely: number;
        high: number;
      };
      estimated_trial_duration: string;
      key_factors: string[];
      created_at: string;
    };
    analysis: {
      risk_assessment: {
        result: {
          overall_risk: string;
          risk_factors: string[];
          mitigation_strategies: string[];
        };
        confidenceScore: number;
        factors: string[];
        createdAt: string;
        updatedAt: string;
      };
      cost_estimate: {
        result: {
          total_estimated_cost: number;
          breakdown: {
            attorney_fees: number;
            expert_witnesses: number;
            court_costs: number;
            other_expenses: number;
          };
          cost_range: {
            low: number;
            high: number;
          };
        };
        confidenceScore: number;
        factors: string[];
        createdAt: string;
        updatedAt: string;
      };
      settlement_analysis: {
        result: {
          settlement_probability: number;
          optimal_settlement_range: {
            low: number;
            recommended: number;
            high: number;
          };
          settlement_factors: string[];
        };
        confidenceScore: number;
        factors: string[];
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

export const AIAnalysisDisplay: React.FC<AIAnalysisDisplayProps> = ({
  aiData
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
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

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
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

  return (
    <div className="space-y-6">
      {/* AI Enrichment */}
      {aiData.enrichment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>AI Case Enrichment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Case Complexity</h4>
                <Badge className={getComplexityColor(aiData.enrichment.enrichment_data.case_complexity)}>
                  {aiData.enrichment.enrichment_data.case_complexity}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Estimated Duration</h4>
                <p className="text-lg font-medium">{aiData.enrichment.enrichment_data.estimated_duration}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Legal Issues</h4>
                <div className="flex flex-wrap gap-1">
                  {aiData.enrichment.enrichment_data.key_legal_issues.map((issue, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {issue}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Recommended Strategies</h4>
                <div className="space-y-1">
                  {aiData.enrichment.enrichment_data.recommended_strategies.map((strategy, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{strategy}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Risk Factors</h4>
                <div className="space-y-1">
                  {aiData.enrichment.enrichment_data.risk_factors.map((factor, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Predictions */}
      {aiData.predictions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>AI Predictions</span>
              <Badge className={getConfidenceColor(aiData.predictions.confidence_prediction_percentage / 100)}>
                {aiData.predictions.confidence_prediction_percentage}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Outcome Prediction */}
              <div className="text-center">
                <h4 className="font-semibold mb-2">Success Probability</h4>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(aiData.predictions.outcome_prediction_score * 100)}%
                </div>
                <Progress value={aiData.predictions.outcome_prediction_score * 100} className="h-2" />
              </div>

              {/* Settlement Probability */}
              <div className="text-center">
                <h4 className="font-semibold mb-2">Settlement Probability</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(aiData.predictions.settlement_probability * 100)}%
                </div>
                <Progress value={aiData.predictions.settlement_probability * 100} className="h-2" />
              </div>

              {/* Trial Duration */}
              <div className="text-center">
                <h4 className="font-semibold mb-2">Estimated Trial Duration</h4>
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {aiData.predictions.estimated_trial_duration}
                </div>
                <p className="text-sm text-gray-600">Days in court</p>
              </div>
            </div>

            {/* Settlement Range */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Estimated Settlement Range</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Low</p>
                  <p className="text-lg font-bold text-red-600">
                    {formatCurrency(aiData.predictions.estimated_settlement_range.low)}
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Likely</p>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrency(aiData.predictions.estimated_settlement_range.likely)}
                  </p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">High</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(aiData.predictions.estimated_settlement_range.high)}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Factors */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Key Factors</h4>
              <div className="flex flex-wrap gap-2">
                {aiData.predictions.key_factors.map((factor, index) => (
                  <Badge key={index} variant="secondary">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Analysis */}
      {aiData.analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              <span>Detailed Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="risk" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
                <TabsTrigger value="settlement">Settlement Analysis</TabsTrigger>
              </TabsList>

              {/* Risk Assessment */}
              <TabsContent value="risk" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Overall Risk</h4>
                    <Badge className={getRiskColor(aiData.analysis.risk_assessment.result.overall_risk)}>
                      {aiData.analysis.risk_assessment.result.overall_risk}
                    </Badge>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Confidence: {Math.round(aiData.analysis.risk_assessment.confidenceScore * 100)}%</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Risk Factors</h4>
                    <div className="space-y-1">
                      {aiData.analysis.risk_assessment.result.risk_factors.map((factor, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mitigation Strategies</h4>
                  <div className="space-y-1">
                    {aiData.analysis.risk_assessment.result.mitigation_strategies.map((strategy, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Cost Analysis */}
              <TabsContent value="cost" className="space-y-4">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold text-green-600">
                    {formatCurrency(aiData.analysis.cost_estimate.result.total_estimated_cost)}
                  </h4>
                  <p className="text-sm text-gray-600">Total Estimated Cost</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Confidence: {Math.round(aiData.analysis.cost_estimate.confidenceScore * 100)}%
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Attorney Fees</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(aiData.analysis.cost_estimate.result.breakdown.attorney_fees)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Expert Witnesses</p>
                    <p className="text-lg font-bold text-purple-600">
                      {formatCurrency(aiData.analysis.cost_estimate.result.breakdown.expert_witnesses)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Scale className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Court Costs</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(aiData.analysis.cost_estimate.result.breakdown.court_costs)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Info className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Other Expenses</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatCurrency(aiData.analysis.cost_estimate.result.breakdown.other_expenses)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Cost Range (Low)</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(aiData.analysis.cost_estimate.result.cost_range.low)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Cost Range (High)</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(aiData.analysis.cost_estimate.result.cost_range.high)}
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Settlement Analysis */}
              <TabsContent value="settlement" className="space-y-4">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold text-blue-600">
                    {Math.round(aiData.analysis.settlement_analysis.result.settlement_probability * 100)}%
                  </h4>
                  <p className="text-sm text-gray-600">Settlement Probability</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Confidence: {Math.round(aiData.analysis.settlement_analysis.confidenceScore * 100)}%
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Optimal Settlement Range</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Low</p>
                      <p className="text-lg font-bold text-red-600">
                        {formatCurrency(aiData.analysis.settlement_analysis.result.optimal_settlement_range.low)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Recommended</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency(aiData.analysis.settlement_analysis.result.optimal_settlement_range.recommended)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">High</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(aiData.analysis.settlement_analysis.result.optimal_settlement_range.high)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Settlement Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {aiData.analysis.settlement_analysis.result.settlement_factors.map((factor, index) => (
                      <Badge key={index} variant="secondary">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAnalysisDisplay; 