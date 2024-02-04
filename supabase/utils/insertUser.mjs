import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = Deno.env.get('SUPABASE_URL') ?? '';
const key = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
console.log(url);
console.log(key);
const password = Deno.env.get('PASSWORD') ?? '';
console.log(password);
// const auth_key = Deno.env.get('PROSPER_KEY') ?? '';
const supabase = createClient(url, key);

const me = {
    'email': 'luca.miniati@gmail.com',
    'password': password,
    // 'auth_key': auth_key,
    // 'monthly_allocation': 100,
}

const { data, error } = await supabase.auth.signUp(me);
console.log(data);
console.log(error.message);
