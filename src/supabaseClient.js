import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.sessionStorage, 
    autoRefreshToken: true,
    persistSession: true, // Keep this true
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token' // Explicitly name the key
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' } // This can sometimes force a cleaner handshake
  }
});