import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Wifi, Cpu, Database, FileText, X, ChevronDown, ChevronUp } from 'lucide-react';
import useBackendHealth, { BackendHealth } from '@/hooks/useBackendHealth';

interface BackendStatusIndicatorProps {
  className?: string;
  showDetails?: boolean;
  dismissible?: boolean;
  position?: 'header' | 'floating' | 'sidebar';
  onClose?: () => void;
}

const BackendStatusIndicator: React.FC<BackendStatusIndicatorProps> = ({
  className = '',
  showDetails = true,
  dismissible = false,
  position = 'header',
  onClose
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { health, isLoading, error, lastCheck, checkHealth } = useBackendHealth({
    checkInterval: 60000, // Check every minute
    autoCheck: true
  });

  // Handle click outside for floating position
  useEffect(() => {
    if (position === 'floating' && onClose) {
      const handleClickOutside = (event: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [position, onClose]);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onClose) {
      onClose();
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'healthy':
        return { 
          text: 'Healthy', 
          color: 'bg-green-100 text-green-800 border-green-300',
          icon: CheckCircle
        };
      case 'unhealthy':
        return { 
          text: 'Unhealthy', 
          color: 'bg-red-100 text-red-800 border-red-300',
          icon: XCircle
        };
      default:
        return { 
          text: 'Unknown', 
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          icon: AlertCircle
        };
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'realtime':
        return Wifi;
      case 'ai':
        return Cpu;
      case 'supabase':
        return Database;
      case 'pdfProcessing':
        return FileText;
      default:
        return CheckCircle;
    }
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  // Loading state
  if (isLoading && !health) {
    return (
      <Card ref={cardRef} className={`${className} ${position === 'floating' ? 'fixed top-4 right-4 z-50 shadow-lg' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <RefreshCw className="animate-spin h-4 w-4 mr-2" />
              <span className="text-sm">Checking backend status...</span>
            </div>
            {dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error && !health) {
    return (
      <Card ref={cardRef} className={`${className} ${position === 'floating' ? 'fixed top-4 right-4 z-50 shadow-lg' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-600">Backend unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkHealth}
                disabled={isLoading}
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Retry
              </Button>
              {dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!health) {
    return null;
  }

  const statusDisplay = getStatusDisplay(health.status);
  const StatusIcon = statusDisplay.icon;

  return (
    <Card ref={cardRef} className={`${className} ${position === 'floating' ? 'fixed top-4 right-4 z-50 shadow-lg transition-all duration-200 ease-in-out' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium">Backend Status</CardTitle>
            <Badge 
              variant="outline" 
              className={`${statusDisplay.color} flex items-center gap-1`}
            >
              <StatusIcon size={12} />
              {statusDisplay.text}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {showDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0 transition-colors"
              >
                {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={checkHealth}
              disabled={isLoading}
              className="h-6 w-6 p-0 transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            {dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 transition-colors hover:bg-gray-100"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {showDetails && (
        <div className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(health.features).map(([feature, available]) => {
                  const FeatureIcon = getFeatureIcon(feature);
                  return (
                    <div key={feature} className="flex items-center gap-2">
                      <FeatureIcon 
                        size={14} 
                        className={available ? 'text-green-500' : 'text-gray-400'} 
                      />
                      <span className="text-xs capitalize">
                        {feature.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          available 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}
                      >
                        {available ? 'OK' : 'Off'}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              {health.version && (
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Version: {health.version}
                </div>
              )}

              {lastCheck && (
                <div className="text-xs text-gray-500">
                  Last checked: {lastCheck.toLocaleTimeString()}
                </div>
              )}
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
};

export default BackendStatusIndicator; 