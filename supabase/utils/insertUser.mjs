import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env['SUPABASE_URL'] ?? '';
const key = process.env['SUPABASE_ANON_KEY'] ?? '';
const supabase = createClient(url, key);
