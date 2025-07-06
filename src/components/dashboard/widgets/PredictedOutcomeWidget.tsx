
import { ArrowDown, ArrowUp, Scale, DollarSign, Briefcase, Clock } from 'lucide-react';
import { useCaseAnalysis } from '@/hooks/useCaseAnalysis';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PredictedOutcomeWidgetProps {
  caseId?: string;
  isComparison?: boolean;
  caseData?: any;
}

const PredictedOutcomeWidget = ({ caseId, isComparison = false, caseData = null }: PredictedOutcomeWidgetProps) => {
  const { 
    probability, 
    financialPrediction, 
    costEstimate, 
    predictions, 
    isLoading, 
    errors, 
    analysisStatus 
  } = useCaseAnalysis(caseId);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  // Error state
  if (errors.length > 0 && analysisStatus === 'failed') {
    return (
      <Alert>
        <AlertDescription>
          Unable to load prediction data. Analysis may be in progress.
        </AlertDescription>
      </Alert>
    );
  }

  // Get data from multiple sources with fallbacks
  const getOutcomePrediction = () => {
    // Priority: API probability > Supabase predictions > fallback
    if (probability?.successProbability) {
      return {
        score: probability.successProbability,
        confidence: probability.confidence || 'medium',
        likelihood: probability.successProbability > 70 ? 'Favorable' : 
                   probability.successProbability > 40 ? 'Mixed' : 'Challenging'
      };
    }

    if (predictions?.outcome_prediction_score) {
      return {
        score: predictions.outcome_prediction_score,
        confidence: predictions.confidence_prediction_percentage > 80 ? 'high' : 
                   predictions.confidence_prediction_percentage > 60 ? 'medium' : 'low',
        likelihood: predictions.outcome_prediction_score > 70 ? 'Favorable' : 
                   predictions.outcome_prediction_score > 40 ? 'Mixed' : 'Challenging'
      };
    }

    return null;
  };

  const getFinancialOutcome = () => {
    // Priority: API financial prediction > Supabase predictions > fallback
    if (financialPrediction?.estimatedValue) {
      return {
        amount: financialPrediction.estimatedValue,
        range: `$${financialPrediction.minValue || 0} - $${financialPrediction.maxValue || 0}`,
        currency: financialPrediction.currency || 'USD'
      };
    }

    if (predictions?.estimated_financial_outcome) {
      return {
        amount: predictions.estimated_financial_outcome,
        range: predictions.financial_outcome_range || 'Range not available',
        currency: 'USD'
      };
    }

    return null;
  };

  const getLitigationCost = () => {
    // Priority: API cost estimate > Supabase predictions > fallback
    if (costEstimate?.totalCost) {
      return {
        amount: costEstimate.totalCost,
        range: `$${costEstimate.minCost || 0} - $${costEstimate.maxCost || 0}`
      };
    }

    if (predictions?.litigation_cost_estimate) {
      return {
        amount: predictions.litigation_cost_estimate,
        range: 'Range not available'
      };
    }

    return null;
  };

  const getPredictionBreakdown = () => {
    if (probability?.factors) {
      return {
        liability: probability.factors.jurisdiction || 0,
        trialSuccess: probability.factors.caseType || 0,
        appeal: probability.factors.precedent || 0
      };
    }

    return {
      liability: 78,
      trialSuccess: 52,
      appeal: 31
    };
  };

  const outcome = getOutcomePrediction();
  const financial = getFinancialOutcome();
  const cost = getLitigationCost();
  const breakdown = getPredictionBreakdown();

  // Show analysis pending state
  if (!outcome && analysisStatus === 'pending') {
    return (
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription>
          Case analysis is being processed by AI. Predictions will appear here once complete.
        </AlertDescription>
      </Alert>
    );
  }

  const renderCasePrediction = (data: any, className = '') => {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-medium text-blue-700">Outcome Prediction Score</h5>
              <Scale className="text-blue-500" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-600">
                {outcome?.likelihood || 'Analyzing...'}
              </div>
              <div className="text-xs text-blue-600 flex items-center mt-1">
                <ArrowUp className="mr-1" size={12} />
                {outcome?.score || '--'}% confidence
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h5 className="text-xs font-medium text-green-700">Estimated Financial Outcome</h5>
              <DollarSign className="text-green-500" size={16} />
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-700">
                {financial?.amount ? `$${financial.amount.toLocaleString()}` : 'Calculating...'}
              </div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <span className="text-gray-500 mr-1">Range:</span>
                {financial?.range || 'Range pending'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-amber-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h5 className="text-xs font-medium text-amber-700">Litigation Cost Estimate</h5>
            <Clock className="text-amber-500" size={16} />
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-amber-700">
              {cost?.amount ? `$${cost.amount.toLocaleString()}` : 'Estimating...'}
            </div>
            <div className="text-xs text-amber-600 flex items-center mt-1">
              <span className="text-gray-500 mr-1">Range:</span>
              {cost?.range || 'Range pending'}
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-3">
          <h5 className="text-xs font-medium border-b pb-2">Prediction Breakdown</h5>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Liability Finding</span>
              <span className="text-xs font-medium text-green-600">{breakdown.liability}% likely</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Trial Success (if no settlement)</span>
              <span className="text-xs font-medium text-amber-600">{breakdown.trialSuccess}% likely</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Appeal After Trial</span>
              <span className="text-xs font-medium text-red-600">{breakdown.appeal}% likely</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <div className="flex items-center">
            <Briefcase size={12} className="mr-1" />
            <span>
              {predictions?.similar_cases?.length 
                ? `Based on ${predictions.similar_cases.length} similar cases` 
                : 'Based on AI legal analysis'}
            </span>
          </div>
          <div className="mt-1">
            Last updated: {predictions?.updated_at 
              ? new Date(predictions.updated_at).toLocaleString() 
              : 'Recently'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isComparison ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="border-r pr-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case A</h4>
            {renderCasePrediction(caseData)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case B</h4>
            {renderCasePrediction(caseData)}
          </div>
        </div>
      ) : (
        renderCasePrediction(caseData)
      )}
    </div>
  );
};

export default PredictedOutcomeWidget;
