import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

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

const createSupabaseClient = () => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials are missing');
      return createMockClient();
    }

    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Anon Key:', supabaseAnonKey ? 'Provided' : 'Not provided');

    // Validate the configuration
    const isValidConfig = 
      supabaseUrl.startsWith('https://') && 
      !supabaseUrl.includes('your-project-id') &&
      supabaseAnonKey.length > 0;

    console.log('Is valid Supabase config:', isValidConfig);

    if (!isValidConfig) {
      console.warn('Invalid Supabase configuration');
      return createMockClient();
    }

    // Create the actual client
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return createMockClient();
  }
};

// Initialize the client only once
if (!supabaseInstance) {
  supabaseInstance = createSupabaseClient();
}

// Export the singleton instance
export const supabase = supabaseInstance;

// Export configuration status
export const isSupabaseConfigured = !(supabase as any).isMock;