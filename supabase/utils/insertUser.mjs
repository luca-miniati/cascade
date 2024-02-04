import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = Deno.env.get('SUPABASE_URL') ?? '';
const key = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const password = Deno.env.get('PASSWORD') ?? '';
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

if (error) {
    console.log(error.message);
}
