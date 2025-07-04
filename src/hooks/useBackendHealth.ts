import { useState, useEffect, useCallback } from 'react';
import { checkBackendHealth } from '@/services/caseStatusService';

export interface BackendHealth {
  status: 'healthy' | 'unhealthy' | 'unknown';
  features: {
    realtime: boolean;
    ai: boolean;
    supabase: boolean;
    pdfProcessing: boolean;
  };
  timestamp: string;
  version?: string;
}

interface UseBackendHealthOptions {
  checkInterval?: number;
  autoCheck?: boolean;
}

const useBackendHealth = (options: UseBackendHealthOptions = {}) => {
  const { checkInterval = 30000, autoCheck = true } = options;
  
  const [health, setHealth] = useState<BackendHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const healthData = await checkBackendHealth();
      setHealth(healthData);
      setLastCheck(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check backend health');
      setHealth(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial health check
  useEffect(() => {
    if (autoCheck) {
      checkHealth();
    }
  }, [checkHealth, autoCheck]);

  // Auto-refresh health status
  useEffect(() => {
    if (!autoCheck) return;

    const interval = setInterval(() => {
      checkHealth();
    }, checkInterval);

    return () => clearInterval(interval);
  }, [checkHealth, checkInterval, autoCheck]);

  return {
    health,
    isLoading,
    error,
    lastCheck,
    checkHealth
  };
};

export default useBackendHealth; 