import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, FileText, Wifi, WifiOff } from 'lucide-react';
import { useAllCasesStatus, UserCaseStatus } from '@/services/caseStatusService';
import { useDashboard } from '@/contexts/DashboardContext';

interface CaseProcessingStatusWidgetProps {
  className?: string;
}

const CaseProcessingStatusWidget: React.FC<CaseProcessingStatusWidgetProps> = ({
  className = ''
}) => {
  const { casesStatus, isLoading, error, refreshStatus } = useAllCasesStatus();
  const { selectComparisonCase } = useDashboard();

  // Calculate statistics
  const stats = React.useMemo(() => {
    const total = casesStatus.length;
    const processing = casesStatus.filter(c => c.status === 'processing').length;
    const pending = casesStatus.filter(c => c.status === 'pending').length;
    const completed = casesStatus.filter(c => c.status === 'completed').length;
    const failed = casesStatus.filter(c => c.status === 'failed').length;
    
    const processingProgress = total > 0 ? ((completed + failed) / total) * 100 : 0;
    
    return {
      total,
      processing,
      pending,
      completed,
      failed,
      processingProgress
    };
  }, [casesStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'processing':
        return RefreshCw;
      case 'completed':
        return CheckCircle;
      case 'failed':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleCaseClick = (caseId: string) => {
    selectComparisonCase(caseId);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Case Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Loading...</span>
              <RefreshCw size={16} className="animate-spin text-gray-400" />
            </div>
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
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{Math.round(stats.processingProgress)}%</span>
          </div>
          <Progress value={stats.processingProgress} className="h-2" />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
            <div className="text-xs text-blue-600">Processing</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-yellow-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-xs text-red-600">Failed</div>
          </div>
        </div>

        {/* Recent Cases */}
        {casesStatus.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Recent Cases</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {casesStatus.slice(0, 5).map((caseStatus) => {
                const StatusIcon = getStatusIcon(caseStatus.status);
                const statusColor = getStatusColor(caseStatus.status);
                
                return (
                  <div
                    key={caseStatus.caseId}
                    className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleCaseClick(caseStatus.caseId)}
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <StatusIcon size={14} className="text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {caseStatus.caseName || `Case ${caseStatus.caseId.slice(0, 8)}...`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {caseStatus.caseStage}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${statusColor} text-xs`}>
                      {caseStatus.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {casesStatus.length === 0 && (
          <div className="flex items-center justify-center space-x-2 text-gray-500 py-4">
            <FileText size={16} />
            <span className="text-sm">No cases found</span>
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

export default CaseProcessingStatusWidget; 