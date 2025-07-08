
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { isTokenExpired, refreshSession } from '@/utils/auth';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  validateAccessCode: (code: string) => boolean;
  refreshSession: () => Promise<void>;
};

const VALID_ACCESS_CODE = "JpmpAlegi2025";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh session manually
  const handleRefreshSession = async () => {
    try {
      const refreshedSession = await refreshSession();
      if (refreshedSession) {
        setSession(refreshedSession);
        setUser(refreshedSession.user);
      }
    } catch (error) {
      console.error('Failed to refresh session:', error);
    }
  };

  // Check and refresh token if needed
  const checkAndRefreshToken = async (currentSession: Session | null) => {
    if (!currentSession?.access_token) {
      return;
    }

    if (isTokenExpired(currentSession.access_token, 10)) { // 10 minute buffer
      console.log('Token is expired or will expire soon, refreshing...');
      await handleRefreshSession();
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Check if token needs refresh on initial load
      if (session) {
        checkAndRefreshToken(session);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Check if token needs refresh on auth state change
        if (session) {
          checkAndRefreshToken(session);
        }
      }
    );

    // Set up periodic token refresh check (every 5 minutes)
    const tokenCheckInterval = setInterval(() => {
      if (session) {
        checkAndRefreshToken(session);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      subscription.unsubscribe();
      clearInterval(tokenCheckInterval);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const validateAccessCode = (code: string) => {
    return code === VALID_ACCESS_CODE;
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
    validateAccessCode,
    refreshSession: handleRefreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
