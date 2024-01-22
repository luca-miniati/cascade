/*
    ProsperZero Order Function
    --------------------------

    What it do?
        * Makes orders for each user at some time each morning
    
    How?
        * Fetch all users, and fetch all user settings
        * Then, invoke optimize function to get orders
        * Fulfill orders
        * It's that simple
*/

import { createClient } from 'https://esm.sh/@supabase/supabase-js';

/*
    ProsperZero Order Function
    --------------------------

    What it do?
        * Makes orders for each user at some time each morning
    
    How?
        * Fetch all users, and fetch all user settings
        * Then, invoke optimize function to get orders
        * Fulfill orders
        * It's that simple
*/

function optimize(user: string) {
    console.log(user);
}

async function scheduleLoanProcessing() {
    try {
        // Init Supabase
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        );
        
        // Fetch users
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            throw error;
        }

        // Init promise list
        const users = data['data'];
        const optimizePromises = [];

        for (const user in users) {
            optimizePromises.push(optimize(user));
        }

        // Optimize all portfolios
        await Promise.all(optimizePromises);

        return new Response("Orders completed.", { status: 200 });

    } catch (error) {
        console.log(error?.message ?? error);
        console.log(Deno.env.get('SUPABASE_URL'));
        return new Response(String(error?.message ?? error), { status: 500 });
    }
}

Deno.serve(async (_) => {
    try {
        const res = await scheduleLoanProcessing();
        return res;
    } catch (error) {
        console.log(error?.message ?? error);
        return new Response(String(error?.message ?? error), { status: 500 });
    }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/scheduleLoanProcessing' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
