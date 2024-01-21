import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

console.log("Hello from Functions!")

/*
    ProsperZero Order Function
    --------------------------

    What does it do?
        * Makes orders for each user at some time each morning
    
    How?
        * Fetch all users, and fetch all user settings
        * Then, invoke optimize function to get orders
        * Fulfill orders
        * It's that simple
*/
async function getUsers() {
    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        );

        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        return new Response(String(error?.message ?? error), { status: 500 });
    }
}

const data = await getUsers();
console.log(data);
// Deno.serve(async (req: Request) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   };
//
//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   );
// });

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/order' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
