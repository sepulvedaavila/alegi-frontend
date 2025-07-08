import { Session } from '@supabase/supabase-js';
import { createAuthHeaders, handleAuthError } from './auth';

// Get backend URL from environment or use default
const getBackendUrl = () => {
  const url = import.meta.env.VITE_BACKEND_URL || 'https://alegi-backend.vercel.app';
  return url;
};

export interface ApiClientOptions {
  session: Session | null;
  baseURL?: string;
  timeout?: number;
}

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export class ApiClient {
  private session: Session | null;
  private baseURL: string;
  private timeout: number;

  constructor(options: ApiClientOptions) {
    this.session = options.session;
    this.baseURL = options.baseURL || getBackendUrl();
    this.timeout = options.timeout || 30000; // 30 seconds default
  }

  /**
   * Make an authenticated API request with automatic token refresh
   */
  async request<T = any>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.timeout
    } = options;

    // Create authentication headers
    const authHeaders = await createAuthHeaders(this.session);
    if (!authHeaders) {
      throw new Error('No valid authentication token available');
    }

    // Merge headers
    const requestHeaders = {
      ...authHeaders,
      ...headers
    };

    // Prepare request config
    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      signal: AbortSignal.timeout(timeout)
    };

    // Add body if provided
    if (body) {
      if (typeof body === 'string') {
        requestConfig.body = body;
      } else {
        requestConfig.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, requestConfig);

      if (!response.ok) {
        // Handle authentication errors with token refresh
        if (response.status === 401) {
          return await this.handleAuthError(endpoint, options);
        }

        // Handle other errors
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as T;
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Handle authentication errors by refreshing token and retrying
   */
  private async handleAuthError<T>(endpoint: string, options: ApiRequestOptions): Promise<T> {
    try {
      // Try to refresh the session
      const { refreshSession } = await import('./auth');
      const refreshedSession = await refreshSession();
      
      if (refreshedSession) {
        // Update the session and retry the request
        this.session = refreshedSession;
        console.log('Token refreshed, retrying request:', endpoint);
        return await this.request(endpoint, options);
      } else {
        throw new Error('Authentication failed - please sign in again');
      }
    } catch (refreshError) {
      console.error('Failed to refresh token:', refreshError);
      throw new Error('Authentication failed - please sign in again');
    }
  }

  /**
   * Update the session (useful when session changes)
   */
  updateSession(session: Session | null) {
    this.session = session;
  }

  // Convenience methods
  async get<T = any>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T = any>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }
}

/**
 * Create an API client instance
 */
export const createApiClient = (session: Session | null, options?: Partial<ApiClientOptions>): ApiClient => {
  return new ApiClient({
    session,
    ...options
  });
};

/**
 * Hook to get an API client with current session
 */
export const useApiClient = (session: Session | null): ApiClient => {
  return createApiClient(session);
}; 