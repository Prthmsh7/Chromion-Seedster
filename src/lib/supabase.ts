import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define the options type for better type safety
const defaultOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-application-name': 'seedster' }
  }
};

// Create a mock client for development when env vars are not set
const createMockClient = (): SupabaseClient => {
  return createClient(
    'https://mock.supabase.co',
    'mock-key',
    defaultOptions
  );
};

const createSupabaseClient = (): SupabaseClient => {
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
    return createClient(
      supabaseUrl,
      supabaseAnonKey,
      defaultOptions
    );

  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return createMockClient();
  }
};

// Initialize the client
const supabaseInstance = createSupabaseClient();

// Export the instance
export const supabase = supabaseInstance;

// Export configuration status
export const isSupabaseConfigured = !(supabase as any).isMock;