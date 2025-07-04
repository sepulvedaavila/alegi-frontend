import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { useAllCasesStatus, UserCaseStatus } from '@/services/caseStatusService';
import CaseStatus from './CaseStatus';

interface CasesStatusListProps {
  className?: string;
  onCaseClick?: (caseId: string) => void;
  showDetails?: boolean;
}

const CasesStatusList: React.FC<CasesStatusListProps> = ({
  className = '',
  onCaseClick,
  showDetails = false
}) => {
  const { casesStatus, isLoading, error, refreshStatus } = useAllCasesStatus();

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className={className}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <AlertCircle size={20} />
              <span>Error loading cases: {error}</span>
            </div>
            <div className="mt-4 flex justify-center">
              <Button onClick={refreshStatus} variant="outline">
                <RefreshCw size={16} className="mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (casesStatus.length === 0) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <FileText size={20} />
              <span>No cases found</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Group cases by status
  const groupedCases = casesStatus.reduce((acc, caseStatus) => {
    const status = caseStatus.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(caseStatus);
    return acc;
  }, {} as Record<string, UserCaseStatus[]>);

  // Order of statuses to display
  const statusOrder = ['processing', 'pending', 'completed', 'failed'];

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Case Processing Status
            </CardTitle>
            <Button onClick={refreshStatus} variant="outline" size="sm">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {statusOrder.map((status) => {
            const cases = groupedCases[status];
            if (!cases || cases.length === 0) return null;

            const StatusIcon = getStatusIcon(status);
            const statusColor = getStatusColor(status);
            const statusText = getStatusText(status);

            return (
              <div key={status} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <StatusIcon size={16} className="text-gray-600" />
                  <h3 className="font-medium text-gray-900">{statusText}</h3>
                  <Badge variant="outline" className={statusColor}>
                    {cases.length}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {cases.map((caseStatus) => (
                    <div key={caseStatus.caseId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-gray-900">
                              {caseStatus.caseName || `Case ${caseStatus.caseId.slice(0, 8)}...`}
                            </h4>
                            <Badge variant="outline" className={statusColor}>
                              {statusText}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <div>Stage: {caseStatus.caseStage}</div>
                            <div>Last updated: {formatDate(caseStatus.lastUpdate)}</div>
                            <div>Created: {formatDate(caseStatus.createdAt)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {onCaseClick && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onCaseClick(caseStatus.caseId)}
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>

                      {showDetails && (
                        <div className="mt-4 pt-4 border-t">
                          <CaseStatus
                            caseId={caseStatus.caseId}
                            caseName={caseStatus.caseName}
                            showDetails={false}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default CasesStatusList; 