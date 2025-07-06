
import { Scale, TrendingUp, Award, Clock, UserCog, Gavel, BarChart3 } from 'lucide-react';
import { useCaseAnalysis } from '@/hooks/useCaseAnalysis';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface JudgeAnalysisWidgetProps {
  caseId?: string;
  isComparison?: boolean;
  caseData?: any;
}

const JudgeAnalysisWidget = ({ caseId, isComparison = false, caseData = null }: JudgeAnalysisWidgetProps) => {
  const { 
    judgeAnalysis, 
    predictions, 
    enrichment,
    isLoading, 
    errors, 
    analysisStatus 
  } = useCaseAnalysis(caseId);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const getJudgeData = () => {
    // Priority: API judge analysis > Supabase predictions > enrichment > fallback
    if (judgeAnalysis?.judgeInfo) {
      return {
        name: judgeAnalysis.judgeInfo.name,
        totalCases: judgeAnalysis.statistics?.totalCases || 0,
        plaintiffFavorRate: judgeAnalysis.statistics?.plaintiffWinRate || 0,
        avgCaseDuration: judgeAnalysis.statistics?.avgCaseDuration || 0,
        summaryJudgmentRate: judgeAnalysis.statistics?.summaryJudgmentRate || 0,
        settlementRate: judgeAnalysis.statistics?.settlementRate || 0
      };
    }

    if (predictions?.judge_analysis) {
      const judge = predictions.judge_analysis;
      return {
        name: judge.name || 'Judge information pending',
        totalCases: judge.total_cases || 0,
        plaintiffFavorRate: judge.plaintiff_favor_rate || 0,
        avgCaseDuration: judge.avg_case_duration || 0,
        summaryJudgmentRate: judge.summary_judgment_rate || 0,
        settlementRate: judge.settlement_rate || 0
      };
    }

    if (enrichment?.potential_assigned_judges && enrichment.potential_assigned_judges.length > 0) {
      const judge = enrichment.potential_assigned_judges[0];
      return {
        name: judge.name || 'Judge analysis pending',
        totalCases: judge.cases_heard || 0,
        plaintiffFavorRate: judge.plaintiff_success_rate || 0,
        avgCaseDuration: 0,
        summaryJudgmentRate: 0,
        settlementRate: 0
      };
    }

    return null;
  };

  const judgeData = getJudgeData();

  // Show analysis pending state
  if (!judgeData && analysisStatus === 'pending') {
    return (
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription>
          Judge analysis is being processed. Information will appear once case assignment is determined.
        </AlertDescription>
      </Alert>
    );
  }

  // Error state
  if (errors.length > 0 && !judgeData) {
    return (
      <Alert>
        <AlertDescription>
          Judge information unavailable. Analysis may still be in progress.
        </AlertDescription>
      </Alert>
    );
  }

  const renderAnalysis = (data: any, className = '') => {
    if (!judgeData) {
      return (
        <div className={`text-center py-4 ${className}`}>
          <div className="text-sm text-gray-500">Judge assignment pending</div>
        </div>
      );
    }

    return (
      <div className={`space-y-3 ${className}`}>
        <div className="text-center">
          <h4 className="font-medium text-lg">{judgeData.name}</h4>
          <p className="text-sm text-gray-600">Presiding Judge</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 bg-blue-50 rounded">
            <div className="flex justify-center mb-1">
              <Scale className="text-blue-500" size={16} />
            </div>
            <div className="text-lg font-bold text-blue-600">
              {judgeData.totalCases || '--'}
            </div>
            <div className="text-xs text-blue-700">Cases Heard</div>
          </div>
          
          <div className="p-2 bg-green-50 rounded">
            <div className="flex justify-center mb-1">
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <div className="text-lg font-bold text-green-600">
              {judgeData.plaintiffFavorRate ? `${Math.round(judgeData.plaintiffFavorRate)}%` : '--'}
            </div>
            <div className="text-xs text-green-700">Plaintiff Favor</div>
          </div>
          
          <div className="p-2 bg-purple-50 rounded">
            <div className="flex justify-center mb-1">
              <Award className="text-purple-500" size={16} />
            </div>
            <div className="text-lg font-bold text-purple-600">
              {judgeData.settlementRate ? `${Math.round(judgeData.settlementRate)}%` : '--'}
            </div>
            <div className="text-xs text-purple-700">Settlement Rate</div>
          </div>
        </div>

        {(judgeData.avgCaseDuration > 0 || judgeData.summaryJudgmentRate > 0) && (
          <div className="pt-2 border-t">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {judgeData.avgCaseDuration > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Duration:</span>
                  <span>{judgeData.avgCaseDuration} months</span>
                </div>
              )}
              {judgeData.summaryJudgmentRate > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Summary Judgment:</span>
                  <span>{Math.round(judgeData.summaryJudgmentRate)}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center">
          {judgeAnalysis?.lastUpdated 
            ? `Updated: ${new Date(judgeAnalysis.lastUpdated).toLocaleDateString()}`
            : 'Analysis based on available court records'}
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
            {renderAnalysis(caseData)}
          </div>
          <div className="pl-2">
            <h4 className="text-sm font-medium text-alegi-blue mb-2">Case B</h4>
            {renderAnalysis(caseData)}
          </div>
        </div>
      ) : (
        renderAnalysis(caseData)
      )}
    </div>
  );
};

export default JudgeAnalysisWidget;
