import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

Deno.serve(async (_) => {
    try {
        // Init Supabase
        const supabase = await createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        );

        // Fetch users
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            throw error;
        }

        const users = data['data'];
        for (const user of users) {

        }

        return new Response("Orders completed.", { status: 200 });
    } catch (error) {
        console.log(error?.message ?? error);
        console.log(Deno.env.get('SUPABASE_URL'));
        return new Response(String(error?.message ?? error), { status: 500 });
    }
});
