import { Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AnalysisStatusIndicatorProps {
  status: 'loading' | 'pending' | 'partial' | 'complete' | 'failed';
  hasAnyData: boolean;
  errors: any[];
  onRefresh: () => void;
  lastUpdated?: Date | null;
}

const AnalysisStatusIndicator = ({ 
  status, 
  hasAnyData, 
  errors, 
  onRefresh, 
  lastUpdated 
}: AnalysisStatusIndicatorProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'partial':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'loading':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'complete':
        return 'Analysis Complete';
      case 'partial':
        return 'Analysis In Progress';
      case 'loading':
        return 'Processing...';
      case 'failed':
        return 'Analysis Failed';
      default:
        return 'Analysis Pending';
    }
  };

  const getProgressValue = () => {
    switch (status) {
      case 'complete':
        return 100;
      case 'partial':
        return hasAnyData ? 60 : 30;
      case 'loading':
        return 50;
      case 'failed':
        return 0;
      default:
        return 10;
    }
  };

  if (status === 'complete') {
    return null; // Don't show when complete
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2">{getStatusText()}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={status === 'loading'}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${status === 'loading' ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Progress value={getProgressValue()} className="h-2" />
          
          {status === 'partial' && (
            <div className="text-sm text-gray-600">
              AI analysis is processing your case. Some insights are available now, 
              with more detailed analysis coming soon.
            </div>
          )}
          
          {status === 'pending' && (
            <div className="text-sm text-gray-600">
              Your case has been submitted for AI analysis. 
              This typically takes 2-5 minutes to complete.
            </div>
          )}
          
          {status === 'failed' && errors.length > 0 && (
            <div className="text-sm text-red-600">
              {errors.length} analysis component(s) failed to load. 
              Some data may be temporarily unavailable.
            </div>
          )}
          
          {lastUpdated && (
            <div className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisStatusIndicator; 