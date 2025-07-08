import { getCaseStatus, getEnhancedCaseStatus, getCaseUpdates } from './alegiApiService';

export interface CaseStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  lastUpdate: string;
  caseStage: string;
  aiProcessed?: boolean;
  processingStage?: string;
  estimatedCompletion?: string;
  errors?: string[];
}

export interface StatusPollingCallback {
  (status: CaseStatus): void;
}

export class StatusPollingService {
  private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();
  private session: any;

  constructor(session: any) {
    this.session = session;
  }

  /**
   * Start polling for case status updates
   * @param caseId The case ID to poll for
   * @param callback Function called with status updates
   * @param interval Polling interval in milliseconds (default: 5000ms)
   */
  startPolling(caseId: string, callback: StatusPollingCallback, interval: number = 5000): void {
    if (this.pollingIntervals.has(caseId)) {
      this.stopPolling(caseId);
    }

    const poll = async () => {
      try {
        const status = await getCaseStatus(caseId, this.session);
        callback(status);
        
        // Stop polling if processing is complete
        if (status.status === 'completed' || status.status === 'failed') {
          this.stopPolling(caseId);
        }
      } catch (error) {
        console.error('Polling error for case', caseId, ':', error);
        // Continue polling even on error, but maybe increase interval
      }
    };

    // Initial poll
    poll();
    
    // Set up interval
    const intervalId = setInterval(poll, interval);
    this.pollingIntervals.set(caseId, intervalId);
    
    console.log(`Started polling for case ${caseId} with ${interval}ms interval`);
  }

  /**
   * Stop polling for a specific case
   * @param caseId The case ID to stop polling for
   */
  stopPolling(caseId: string): void {
    const intervalId = this.pollingIntervals.get(caseId);
    if (intervalId) {
      clearInterval(intervalId);
      this.pollingIntervals.delete(caseId);
      console.log(`Stopped polling for case ${caseId}`);
    }
  }

  /**
   * Stop all polling
   */
  stopAllPolling(): void {
    this.pollingIntervals.forEach((intervalId, caseId) => {
      clearInterval(intervalId);
      console.log(`Stopped polling for case ${caseId}`);
    });
    this.pollingIntervals.clear();
  }

  /**
   * Get enhanced status for a case (with processing timestamps)
   * @param caseId The case ID
   * @returns Enhanced status information
   */
  async getEnhancedStatus(caseId: string): Promise<any> {
    try {
      return await getEnhancedCaseStatus(caseId, this.session);
    } catch (error) {
      console.error('Error fetching enhanced status for case', caseId, ':', error);
      throw error;
    }
  }

  /**
   * Check for updates since last check
   * @param caseId The case ID
   * @param lastUpdate ISO timestamp of last update
   * @returns Updates since last check
   */
  async checkUpdates(caseId: string, lastUpdate: string): Promise<any> {
    try {
      return await getCaseUpdates(caseId, lastUpdate, this.session);
    } catch (error) {
      console.error('Error checking updates for case', caseId, ':', error);
      throw error;
    }
  }

  /**
   * Update the session (useful when token is refreshed)
   * @param session New session object
   */
  updateSession(session: any): void {
    this.session = session;
  }

  /**
   * Check if polling is active for a case
   * @param caseId The case ID to check
   * @returns True if polling is active
   */
  isPolling(caseId: string): boolean {
    return this.pollingIntervals.has(caseId);
  }

  /**
   * Get all active polling case IDs
   * @returns Array of case IDs being polled
   */
  getActivePollingCases(): string[] {
    return Array.from(this.pollingIntervals.keys());
  }
}

/**
 * Hook for using the status polling service
 */
export const useStatusPolling = (session: any) => {
  const pollingService = new StatusPollingService(session);
  
  return {
    startPolling: (caseId: string, callback: StatusPollingCallback, interval?: number) => 
      pollingService.startPolling(caseId, callback, interval),
    stopPolling: (caseId: string) => pollingService.stopPolling(caseId),
    stopAllPolling: () => pollingService.stopAllPolling(),
    getEnhancedStatus: (caseId: string) => pollingService.getEnhancedStatus(caseId),
    checkUpdates: (caseId: string, lastUpdate: string) => pollingService.checkUpdates(caseId, lastUpdate),
    updateSession: (newSession: any) => pollingService.updateSession(newSession),
    isPolling: (caseId: string) => pollingService.isPolling(caseId),
    getActivePollingCases: () => pollingService.getActivePollingCases()
  };
}; 