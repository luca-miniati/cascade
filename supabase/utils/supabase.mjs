import { createClient } from '@supabase/supabase-js';

const url = process.env['SUPABASE_URL'] ?? '';
console.log(url);
const key = process.env['SUPABASE_ANON_KEY'] ?? '';
console.log(key);
const supabase = createClient(url, key);

console.log(supabase.from('users').select('*'));
