
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.1';

// Replace these with your actual Supabase URL and Anon Key from the Supabase Dashboard
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
