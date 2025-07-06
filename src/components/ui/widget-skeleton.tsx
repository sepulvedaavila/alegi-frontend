import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface WidgetSkeletonProps {
  size?: 'small' | 'medium' | 'large';
  showHeader?: boolean;
  showChart?: boolean;
  showTable?: boolean;
}

export const WidgetSkeleton = ({ 
  size = 'medium', 
  showHeader = true, 
  showChart = false,
  showTable = false 
}: WidgetSkeletonProps) => {
  const getHeight = () => {
    switch (size) {
      case 'small': return 'h-32';
      case 'large': return 'h-96';
      default: return 'h-64';
    }
  };

  const getChartHeight = () => {
    switch (size) {
      case 'small': return 'h-16';
      case 'large': return 'h-48';
      default: return 'h-32';
    }
  };

  return (
    <Card className={`${getHeight()} w-full`}>
      {showHeader && (
        <CardHeader className="pb-3">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-3 w-[150px]" />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {showChart && (
          <div className="space-y-2">
            <Skeleton className={`${getChartHeight()} w-full`} />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        )}
        
        {showTable && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        )}
        
        {!showChart && !showTable && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[180px]" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Specific skeleton components for different widget types
export const ProbabilityScoreSkeleton = () => (
  <WidgetSkeleton size="medium" showChart={true} />
);

export const SettlementAnalysisSkeleton = () => (
  <WidgetSkeleton size="large" showChart={true} />
);

export const PrecedentAnalysisSkeleton = () => (
  <WidgetSkeleton size="large" showTable={true} />
);

export const JudgeTrendsSkeleton = () => (
  <WidgetSkeleton size="medium" showChart={true} />
);

export const RiskAssessmentSkeleton = () => (
  <WidgetSkeleton size="medium" />
);

export const CostEstimatorSkeleton = () => (
  <WidgetSkeleton size="large" showChart={true} />
);

export const FinancialPredictionSkeleton = () => (
  <WidgetSkeleton size="medium" showChart={true} />
);

export const TimelineSkeleton = () => (
  <WidgetSkeleton size="large" showChart={true} />
);

export const AnalyzedCasesSkeleton = () => (
  <WidgetSkeleton size="small" />
);

export const SimilarCaseFinderSkeleton = () => (
  <WidgetSkeleton size="large" showTable={true} />
);

export const LawUpdatesSkeleton = () => (
  <WidgetSkeleton size="medium" showTable={true} />
); 