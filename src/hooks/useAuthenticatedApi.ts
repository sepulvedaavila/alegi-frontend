import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createApiClient } from '@/utils/apiClient';

/**
 * Hook for making authenticated API calls with automatic token refresh
 */
export const useAuthenticatedApi = () => {
  const { session } = useAuth();

  const apiClient = createApiClient(session);

  // Update the API client when session changes
  apiClient.updateSession(session);

  const makeRequest = useCallback(async <T = any>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      body?: any;
      headers?: Record<string, string>;
      timeout?: number;
    } = {}
  ): Promise<T> => {
    if (!session) {
      throw new Error('No session available');
    }

    return apiClient.request<T>(endpoint, options);
  }, [session, apiClient]);

  // Convenience methods
  const get = useCallback(async <T = any>(endpoint: string, options?: { headers?: Record<string, string>; timeout?: number }): Promise<T> => {
    return makeRequest<T>(endpoint, { method: 'GET', ...options });
  }, [makeRequest]);

  const post = useCallback(async <T = any>(endpoint: string, body?: any, options?: { headers?: Record<string, string>; timeout?: number }): Promise<T> => {
    return makeRequest<T>(endpoint, { method: 'POST', body, ...options });
  }, [makeRequest]);

  const put = useCallback(async <T = any>(endpoint: string, body?: any, options?: { headers?: Record<string, string>; timeout?: number }): Promise<T> => {
    return makeRequest<T>(endpoint, { method: 'PUT', body, ...options });
  }, [makeRequest]);

  const del = useCallback(async <T = any>(endpoint: string, options?: { headers?: Record<string, string>; timeout?: number }): Promise<T> => {
    return makeRequest<T>(endpoint, { method: 'DELETE', ...options });
  }, [makeRequest]);

  const patch = useCallback(async <T = any>(endpoint: string, body?: any, options?: { headers?: Record<string, string>; timeout?: number }): Promise<T> => {
    return makeRequest<T>(endpoint, { method: 'PATCH', body, ...options });
  }, [makeRequest]);

  return {
    session,
    isAuthenticated: !!session,
    makeRequest,
    get,
    post,
    put,
    delete: del,
    patch,
  };
}; 