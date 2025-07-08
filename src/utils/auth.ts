import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

// JWT token validation and management utilities
export interface TokenInfo {
  token: string;
  expiresAt: number;
  isValid: boolean;
  needsRefresh: boolean;
}

/**
 * Decode JWT token without verification (for client-side expiration check)
 */
export const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Check if JWT token is expired or will expire soon
 */
export const isTokenExpired = (token: string, bufferMinutes: number = 5): boolean => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = bufferMinutes * 60; // Convert minutes to seconds
    
    return decoded.exp <= (currentTime + bufferTime);
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Get token information including expiration status
 */
export const getTokenInfo = (token: string): TokenInfo => {
  if (!token) {
    return {
      token: '',
      expiresAt: 0,
      isValid: false,
      needsRefresh: true
    };
  }

  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      return {
        token,
        expiresAt: 0,
        isValid: false,
        needsRefresh: true
      };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expiresAt = decoded.exp;
    const isValid = expiresAt > currentTime;
    const needsRefresh = isTokenExpired(token, 5); // 5 minute buffer

    return {
      token,
      expiresAt,
      isValid,
      needsRefresh
    };
  } catch (error) {
    console.error('Error getting token info:', error);
    return {
      token,
      expiresAt: 0,
      isValid: false,
      needsRefresh: true
    };
  }
};

/**
 * Refresh the current session token
 */
export const refreshSession = async (): Promise<Session | null> => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
    
    if (data.session) {
      console.log('Session refreshed successfully');
      return data.session;
    }
    
    return null;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
};

/**
 * Get a valid JWT token, refreshing if necessary
 */
export const getValidJWTToken = async (session: Session | null): Promise<string | null> => {
  if (!session) {
    console.warn('No session available for JWT token');
    return null;
  }

  const token = session.access_token;
  if (!token) {
    console.warn('No access token in session');
    return null;
  }

  const tokenInfo = getTokenInfo(token);
  
  if (tokenInfo.needsRefresh) {
    console.log('Token needs refresh, attempting to refresh session...');
    const refreshedSession = await refreshSession();
    
    if (refreshedSession && refreshedSession.access_token) {
      const refreshedTokenInfo = getTokenInfo(refreshedSession.access_token);
      if (refreshedTokenInfo.isValid) {
        console.log('Successfully refreshed token');
        return refreshedSession.access_token;
      }
    }
    
    console.error('Failed to refresh token');
    return null;
  }

  return token;
};

/**
 * Create headers with valid JWT token
 */
export const createAuthHeaders = async (session: Session | null): Promise<Record<string, string> | null> => {
  const token = await getValidJWTToken(session);
  
  if (!token) {
    return null;
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
};

/**
 * Check if user is authenticated and has a valid session
 */
export const isAuthenticated = (session: Session | null): boolean => {
  if (!session) {
    return false;
  }

  const token = session.access_token;
  if (!token) {
    return false;
  }

  const tokenInfo = getTokenInfo(token);
  return tokenInfo.isValid;
};

/**
 * Handle authentication errors and attempt token refresh
 */
export const handleAuthError = async (
  error: any, 
  session: Session | null,
  retryFunction: () => Promise<any>
): Promise<any> => {
  // Check if it's an authentication error
  if (error?.status === 401 || error?.message?.includes('authentication')) {
    console.log('Authentication error detected, attempting token refresh...');
    
    const refreshedSession = await refreshSession();
    if (refreshedSession) {
      console.log('Token refreshed, retrying request...');
      return await retryFunction();
    } else {
      console.error('Failed to refresh token, user needs to re-authenticate');
      throw new Error('Authentication failed - please sign in again');
    }
  }
  
  // Re-throw non-authentication errors
  throw error;
}; 