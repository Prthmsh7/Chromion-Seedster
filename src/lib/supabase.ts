import { createClient } from '@supabase/supabase-js';

// Create a mock client for development when env vars are not set
const createMockClient = () => ({
  auth: {
    signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    eq: () => ({ data: [], error: null }),
    upsert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    single: () => ({ data: null, error: null }),
    limit: () => ({ data: [], error: null }),
    order: () => ({ data: [], error: null })
  })
});

// Check if Supabase is properly configured (not placeholder values)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Anon Key:', SUPABASE_ANON_KEY ? 'Provided' : 'Not provided');

// Validate the Supabase configuration
const isValidSupabaseConfig = SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  !SUPABASE_URL.includes('your-project-id') &&
  SUPABASE_URL.startsWith('https://');

console.log('Is valid Supabase config:', isValidSupabaseConfig);

// Create the Supabase client with explicit options
export const supabase = isValidSupabaseConfig
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : createMockClient();

export const isSupabaseConfigured = isValidSupabaseConfig;