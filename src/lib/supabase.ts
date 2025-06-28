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
const isValidSupabaseConfig = process.env.VITE_SUPABASE_URL && 
  process.env.VITE_SUPABASE_ANON_KEY && 
  !process.env.VITE_SUPABASE_URL.includes('your_supabase_project_url') &&
  process.env.VITE_SUPABASE_URL.startsWith('https://');

export const supabase = isValidSupabaseConfig
  ? createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  : createMockClient();

export const isSupabaseConfigured = isValidSupabaseConfig;