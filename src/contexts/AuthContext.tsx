import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider initialized, isSupabaseConfigured:', isSupabaseConfigured);
    
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured properly. Auth functionality will be limited.');
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial user session...');
        
        // First try to get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setUser(null);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('Found existing session for user');
          setUser(session.user);
        } else {
          console.log('No existing session found');
          setUser(null);
        }
        
      } catch (error) {
        console.error('Unexpected error getting initial session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    try {
      console.log('Setting up auth state change listener...');
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => {
        console.log('Cleaning up auth subscription');
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, []);

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured, sign out operation simulated');
      setUser(null);
      return;
    }
    
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        console.log('User signed out successfully');
      }
    } catch (error) {
      console.error('Unexpected error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;