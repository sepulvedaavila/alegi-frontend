import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import useCaseNotifications, { CaseNotification } from '@/hooks/useCaseNotifications';

interface CaseStatusProps {
  caseId: string;
  caseName?: string;
  className?: string;
  showDetails?: boolean;
  onStatusChange?: (status: string) => void;
}

const CaseStatus: React.FC<CaseStatusProps> = ({
  caseId,
  caseName,
  className = '',
  showDetails = true,
  onStatusChange
}) => {
  const {
    status,
    notification,
    isConnected,
    isPolling,
    error,
    refreshStatus
  } = useCaseNotifications({ caseId });

  // Notify parent component of status changes
  React.useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return { 
          text: 'Pending', 
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: Clock,
          description: 'Case is queued for processing'
        };
      case 'processing':
        return { 
          text: 'Processing', 
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: RefreshCw,
          description: 'AI is analyzing your case'
        };
      case 'completed':
        return { 
          text: 'Completed', 
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: CheckCircle,
          description: 'Case analysis is complete'
        };
      case 'failed':
        return { 
          text: 'Failed', 
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: XCircle,
          description: 'Case processing failed'
        };
      default:
        return { 
          text: 'Unknown', 
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: AlertCircle,
          description: 'Status unknown'
        };
    }
  };

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  const getConnectionStatus = () => {
    if (isConnected) {
      return {
        text: 'Real-time',
        color: 'text-green-600',
        icon: Wifi
      };
    } else if (isPolling) {
      return {
        text: 'Polling',
        color: 'text-yellow-600',
        icon: RefreshCw
      };
    } else {
      return {
        text: 'Disconnected',
        color: 'text-red-600',
        icon: WifiOff
      };
    }
  };

  const connectionStatus = getConnectionStatus();
  const ConnectionIcon = connectionStatus.icon;

  return (
    <div className={className}>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {caseName || `Case ${caseId.slice(0, 8)}...`}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`${statusDisplay.color} flex items-center gap-1`}
              >
                <StatusIcon size={14} />
                {statusDisplay.text}
              </Badge>
              <Badge 
                variant="outline" 
                className={`${connectionStatus.color} flex items-center gap-1`}
              >
                <ConnectionIcon size={14} />
                {connectionStatus.text}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {statusDisplay.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshStatus}
              disabled={isConnected}
              className="flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {showDetails && notification && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Latest Update
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {notification.message}
              </p>
              
              {notification.results && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Case Type:</span>
                    <span className="ml-2 text-gray-600">{notification.results.caseType}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Complexity:</span>
                    <span className="ml-2 text-gray-600">{notification.results.complexity}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Enrichment:</span>
                    <span className="ml-2 text-gray-600">
                      {notification.results.hasEnrichment ? 'Available' : 'Not available'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Prediction:</span>
                    <span className="ml-2 text-gray-600">
                      {notification.results.hasPrediction ? 'Available' : 'Not available'}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="mt-3 text-xs text-gray-500">
                Last updated: {new Date(notification.timestamp).toLocaleString()}
              </div>
            </div>
          )}

          {status === 'processing' && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <RefreshCw size={14} className="animate-spin" />
              <span>Processing in progress...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStatus; 