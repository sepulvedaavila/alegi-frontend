import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, FileText, Wifi, WifiOff } from 'lucide-react';
import { useCaseProcessingStatus } from '@/hooks/useCaseProcessingStatus';

interface CaseProcessingStatusProps {
  caseId: string;
  className?: string;
}

const CaseProcessingStatus: React.FC<CaseProcessingStatusProps> = ({ 
  caseId, 
  className = '' 
}) => {
  const { status, loading, error, refreshStatus } = useCaseProcessingStatus(caseId);

  const getStageIcon = (stageStatus: string) => {
    switch (stageStatus) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      case 'started':
        return <RefreshCw size={16} className="text-blue-500 animate-spin" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  const getStageColor = (stageStatus: string) => {
    switch (stageStatus) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      case 'started':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Case Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 py-8">
            <RefreshCw size={16} className="animate-spin text-gray-400" />
            <span className="text-sm text-gray-600">Loading processing status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Case Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 text-red-600 py-4">
            <AlertCircle size={16} />
            <span className="text-sm">Error loading status</span>
          </div>
          <Button onClick={refreshStatus} variant="outline" size="sm" className="w-full">
            <RefreshCw size={14} className="mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Case Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 text-gray-500 py-4">
            <FileText size={16} />
            <span className="text-sm">No processing data available</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Case Processing Status</CardTitle>
          <Button onClick={refreshStatus} variant="outline" size="sm">
            <RefreshCw size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{status.progress.percentage}%</span>
          </div>
          <Progress value={status.progress.percentage} className="h-2" />
          <p className="text-sm text-gray-600">
            Current Stage: {status.progress.currentStage}
          </p>
        </div>

        {/* Processing Stages */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Processing Stages</h4>
          <div className="space-y-2">
            {status.stages.map((stage, index) => (
              <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${getStageColor(stage.status)}`}>
                <div className="flex items-center space-x-3">
                  {getStageIcon(stage.status)}
                  <span className="text-sm font-medium">{stage.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {stage.status}
                  </Badge>
                  {stage.error && (
                    <span className="text-xs text-red-600">{stage.error}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Processing */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Document Processing</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{status.documentProcessing.totalDocuments}</div>
              <div className="text-xs text-blue-600">Total</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{status.documentProcessing.completed}</div>
              <div className="text-xs text-green-600">Completed</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">{status.documentProcessing.failed}</div>
              <div className="text-xs text-red-600">Failed</div>
            </div>
          </div>
          
          {status.documentProcessing.extractions.length > 0 && (
            <div className="space-y-2">
              {status.documentProcessing.extractions.map((doc, index) => (
                <div key={index} className={`flex items-center justify-between p-2 border rounded ${doc.status === 'completed' ? 'bg-green-50' : doc.status === 'failed' ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <span className="text-sm">{doc.fileName}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {doc.status}
                    </Badge>
                    {doc.error && (
                      <span className="text-xs text-red-600">{doc.error}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Fusion Status */}
        {status.dataFusion && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Data Fusion</h4>
            <div className={`p-3 border rounded-lg ${getStageColor(status.dataFusion.status)}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status: {status.dataFusion.status}</span>
                {getStageIcon(status.dataFusion.status)}
              </div>
              {status.dataFusion.error && (
                <p className="text-xs text-red-600 mt-1">{status.dataFusion.error}</p>
              )}
            </div>
          </div>
        )}

        {/* External Data */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">External Data</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <div className="text-lg font-bold text-purple-600">{status.externalData.precedentCases}</div>
              <div className="text-xs text-purple-600">Precedent Cases</div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-center">
              <div className="text-lg font-bold text-indigo-600">{status.externalData.courtListenerCases}</div>
              <div className="text-xs text-indigo-600">CourtListener Cases</div>
            </div>
          </div>
        </div>

        {/* Errors */}
        {status.errors.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-red-900">Processing Errors</h4>
            <div className="space-y-2">
              {status.errors.map((error, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm">
                    <strong className="text-red-900">{error.stage}:</strong>
                    <span className="text-red-700 ml-1">{error.error}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connection Status */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <span>Real-time updates</span>
          <div className="flex items-center space-x-1">
            <Wifi size={12} className="text-green-500" />
            <span>Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseProcessingStatus; 