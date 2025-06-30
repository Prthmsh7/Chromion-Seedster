import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define a type for our mock client that matches SupabaseClient interface
type MockClient = SupabaseClient<any, "public", any>;

// Create a mock client for development when env vars are not set
const createMockClient = (): MockClient => {
  const mockClient = createClient(
    'https://mock.supabase.co',
    'mock-key',
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  );

  // Override methods with mock implementations
  mockClient.auth = {
    ...mockClient.auth,
    signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  } as any;

  // Add a flag to identify mock client
  (mockClient as any).isMock = true;

  return mockClient;
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
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });

    return client;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return createMockClient();
  }
};

// Initialize the client
const supabaseInstance = createSupabaseClient();

// Export the instance (now guaranteed to be non-null)
export const supabase = supabaseInstance;

// Export configuration status
export const isSupabaseConfigured = !(supabase as any).isMock;