import { createClient, SupabaseClient, User } from "https://esm.sh/@supabase/supabase-js@2";
import { get_listings, purchase_notes } from "../utils/index.ts";
import { IModel, ProsperZero } from "../model/index.ts";

async function execute_orders(user: User, model: IModel,supabase: SupabaseClient) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id);
    if (error) {
        return new Response("Oh fuck", { status: 500 });
    }

    // Dates are 1-indexed
    const day_index = new Date().getDate() - 1;

    const user_data = data[0];
    const max_allocation = user_data.allocation_schedule[day_index];
    const listings = await get_listings(user_data.access_token);

    // Call model
    const to_buy = model.optimize(listings, max_allocation);
    await purchase_notes(to_buy, user_data.access_token);
}

Deno.serve(async (_req) => {
    let page = 1;
    let num_results = 50;
    while (num_results >= 50) {
        const url = Deno.env.get("SUPABASE_URL") ?? '';
        const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '';
        const supabase = createClient(url, key);

        const { data: { users }, error } = await supabase.auth.admin.listUsers({ page: page, perPage: 50 });
        if (error) { return new Response("Oh shit", { status: 500 }); }
        num_results = users.length;
        const model = new ProsperZero([]);
        console.log("Starting")

        users.forEach(async user => {
            await execute_orders(user, model, supabase);
        });
        page += 1;
    }

    return new Response("Success", { status: 200 })
});