import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { loadSync } from "https://deno.land/std@0.218.2/dotenv/mod.ts";

const dotenv = loadSync();
const url = dotenv['SUPABASE_URL'];
const key = dotenv['SUPABASE_ANON_KEY'];

const supabase = await createClient(url, key);

const { data: { users }, error } = supabase.auth.admin.listUsers();

if (error)
    throw error;

console.log(data);
