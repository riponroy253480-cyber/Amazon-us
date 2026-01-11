
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.1';

// Supabase Configuration for Project ID: zfawkhwgddslfrbirtah
const SUPABASE_URL = 'https://zfawkhwgddslfrbirtah.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bMWhTWv-nP2xqkAFobGQ7Q_tg4PeWXC';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
