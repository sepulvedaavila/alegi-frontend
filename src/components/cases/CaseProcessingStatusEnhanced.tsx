import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Loader2,
  FileText,
  Brain,
  Search,
  BarChart3,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useRealtimeCaseUpdates } from '@/hooks/useRealtimeCaseUpdates';
import { useCaseProcessingStatus } from '@/hooks/useCaseProcessingStatus';
import { toast } from 'sonner';

interface ProcessingStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimatedDuration: string;
  icon: React.ReactNode;
}

interface CaseProcessingStatusEnhancedProps {
  caseId: string;
  onStatusChange?: (status: string) => void;
}

export const CaseProcessingStatusEnhanced: React.FC<CaseProcessingStatusEnhancedProps> = ({
  caseId,
  onStatusChange
}) => {
  const [stages, setStages] = useState<ProcessingStage[]>([
    {
      id: 'document_processing',
      name: 'Document Processing',
      description: 'Extracting and analyzing uploaded documents',
      status: 'pending',
      estimatedDuration: '1-2 minutes',
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 'ai_analysis',
      name: 'AI Analysis',
      description: 'Running comprehensive case analysis',
      status: 'pending',
      estimatedDuration: '3-5 minutes',
      icon: <Brain className="h-4 w-4" />
    },
    {
      id: 'precedent_research',
      name: 'Precedent Research',
      description: 'Finding similar cases and precedents',
      status: 'pending',
      estimatedDuration: '2-3 minutes',
      icon: <Search className="h-4 w-4" />
    },
    {
      id: 'report_generation',
      name: 'Report Generation',
      description: 'Generating analysis reports and insights',
      status: 'pending',
      estimatedDuration: '1-2 minutes',
      icon: <BarChart3 className="h-4 w-4" />
    }
  ]);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [estimatedCompletion, setEstimatedCompletion] = useState<Date | null>(null);

  // Use existing hook for processing status
  const { status, loading, error, refetch } = useCaseProcessingStatus(caseId);

  // Use real-time updates hook
  const { 
    isConnected, 
    lastUpdate, 
    error: realtimeError,
    subscribe,
    unsubscribe
  } = useRealtimeCaseUpdates({
    onUpdate: (update) => {
      console.log('Real-time update received:', update);
      updateStagesFromStatus(update.processingStatus, update.enhancedProcessingStatus);
      
      if (onStatusChange) {
        onStatusChange(update.processingStatus);
      }

      // Show toast notification for status changes
      if (update.processingStatus === 'completed') {
        toast.success('Case analysis completed!');
      } else if (update.processingStatus === 'failed') {
        toast.error('Case analysis failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Real-time subscription error:', error);
      toast.error('Lost connection to real-time updates');
    }
  });

  // Subscribe to real-time updates
  useEffect(() => {
    if (caseId) {
      subscribe(caseId);
    }

    return () => {
      unsubscribe();
    };
  }, [caseId]);

  // Update stages based on processing status
  const updateStagesFromStatus = (processingStatus: string, enhancedStatus?: string) => {
    setStages(prevStages => {
      const newStages = [...prevStages];
      
      switch (processingStatus) {
        case 'processing':
          // Start document processing
          newStages[0].status = 'processing';
          if (!startTime) {
            setStartTime(new Date());
            setEstimatedCompletion(new Date(Date.now() + 7 * 60 * 1000)); // 7 minutes
          }
          break;
          
        case 'document_extracted':
          newStages[0].status = 'completed';
          newStages[1].status = 'processing';
          break;
          
        case 'ai_analyzing':
          newStages[0].status = 'completed';
          newStages[1].status = 'processing';
          break;
          
        case 'research_precedents':
          newStages[0].status = 'completed';
          newStages[1].status = 'completed';
          newStages[2].status = 'processing';
          break;
          
        case 'generating_reports':
          newStages[0].status = 'completed';
          newStages[1].status = 'completed';
          newStages[2].status = 'completed';
          newStages[3].status = 'processing';
          break;
          
        case 'completed':
          newStages.forEach(stage => stage.status = 'completed');
          break;
          
        case 'failed':
          const currentStageIndex = newStages.findIndex(s => s.status === 'processing');
          if (currentStageIndex !== -1) {
            newStages[currentStageIndex].status = 'failed';
          }
          break;
      }
      
      return newStages;
    });
  };

  // Initialize stages from current status
  useEffect(() => {
    if (status) {
      updateStagesFromStatus(status.processing_status, status.enhanced_processing_status);
    }
  }, [status]);

  const getStageStatusColor = (stageStatus: string) => {
    switch (stageStatus) {
      case 'completed':
        return 'text-green-600';
      case 'processing':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  const getStageIcon = (stage: ProcessingStage) => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const calculateProgress = () => {
    const completedStages = stages.filter(s => s.status === 'completed').length;
    const processingStages = stages.filter(s => s.status === 'processing').length;
    return ((completedStages + processingStages * 0.5) / stages.length) * 100;
  };

  const getOverallStatus = () => {
    if (stages.some(s => s.status === 'failed')) return 'failed';
    if (stages.every(s => s.status === 'completed')) return 'completed';
    if (stages.some(s => s.status === 'processing')) return 'processing';
    return 'pending';
  };

  const overallStatus = getOverallStatus();
  const progress = calculateProgress();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Processing Status...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Fetching case processing status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !realtimeError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Status Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to load processing status. {error.message}
            </AlertDescription>
          </Alert>
          <Button onClick={refetch} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Case Processing Status</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {/* Real-time connection indicator */}
            <div className="flex items-center space-x-1">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
              <span className="text-xs text-gray-500">
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>
            
            <Badge variant={
              overallStatus === 'completed' ? 'default' :
              overallStatus === 'processing' ? 'secondary' :
              overallStatus === 'failed' ? 'destructive' : 'outline'
            }>
              {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {startTime && estimatedCompletion && overallStatus === 'processing' && (
            <div className="flex justify-between text-xs text-gray-500">
              <span>Started: {startTime.toLocaleTimeString()}</span>
              <span>Est. completion: {estimatedCompletion.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Processing Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getStageIcon(stage)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${getStageStatusColor(stage.status)}`}>
                    {stage.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {stage.estimatedDuration}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                
                {stage.status === 'processing' && (
                  <div className="mt-2">
                    <Progress value={50} className="h-1" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status Messages */}
        {overallStatus === 'processing' && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Your case is being analyzed. This process typically takes 5-7 minutes.
              You can safely navigate away - we'll notify you when it's complete.
            </AlertDescription>
          </Alert>
        )}

        {overallStatus === 'completed' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Case analysis complete! All insights and recommendations are now available.
            </AlertDescription>
          </Alert>
        )}

        {overallStatus === 'failed' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Analysis failed at one or more stages. Please try again or contact support if the issue persists.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refetch}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Status
          </Button>

          {overallStatus === 'failed' && (
            <Button 
              size="sm"
              onClick={() => {
                // Trigger reprocessing - this would need API endpoint
                toast.info('Reprocessing initiated...');
              }}
            >
              Retry Analysis
            </Button>
          )}
        </div>

        {/* Real-time updates info */}
        {lastUpdate && (
          <div className="text-xs text-gray-500 border-t pt-2">
            Last update: {new Date(lastUpdate.lastUpdated).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CaseProcessingStatusEnhanced;