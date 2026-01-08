import { createClient } from '@supabase/supabase-js';

// This helps us see if React is reading the file at all
console.log("Environment Check:", {
  url: process.env.REACT_APP_SUPABASE_URL ? "Loaded" : "Missing",
  key: process.env.REACT_APP_SUPABASE_ANON_KEY ? "Loaded" : "Missing"
});

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase keys are missing! Check your .env file and restart your terminal.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.sessionStorage, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}); 