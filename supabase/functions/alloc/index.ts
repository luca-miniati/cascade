import { createClient, SupabaseClient, User } from "https://esm.sh/@supabase/supabase-js@2";
import { get_access_token, get_prosper_data, get_days_in_month } from "../utils/index.ts";

async function set_allocation_schedule(user_id: string, allocation_schedule: number[], supabase: SupabaseClient) {
	const { error } = await supabase
		.from("users")
		.update({ allocation_schedule: allocation_schedule })
		.eq("user_id", user_id);
	
	if (error) {
		throw new Error(error.message);
	}
}

async function update_allocation(user: User, days_in_month: number, supabase: SupabaseClient) {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("user_id", user.id);
	if (error) {
		return new Response("Oh fuck", { status: 500 });
	}

	const user_data = data[0];
	const access_token = await get_access_token(user_data, supabase);
	const prosper_data = await get_prosper_data(access_token);
	const available_cash_balance = prosper_data.available_cash_balance;

	// Amount to be invested over the next month
	const allocation_amount = Math.min(available_cash_balance, user_data.monthly_allocation)

	// Init allocation schedule
	const allocation_schedule = new Array(days_in_month).fill(0);

	// Spread allocation evenly across days in month
	let amount_allocated = 0;
	let allocation_schedule_index = 0;
	while (amount_allocated < allocation_amount) {
		allocation_schedule[allocation_schedule_index] += 25;
		amount_allocated += 25;

		allocation_schedule_index += 1;
		allocation_schedule_index = allocation_schedule_index % days_in_month;
	}

	await set_allocation_schedule(user.id, allocation_schedule, supabase);
}

Deno.serve(async (_req: Request) => {
	let page = 1;
	let num_results = 50;
	while (num_results >= 50) {
		const url = Deno.env.get("SUPABASE_URL") ?? '';
		const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '';
		const supabase = createClient(url, key);

		const { data: { users }, error } = await supabase.auth.admin.listUsers({ page: page, perPage: 50 });
		if (error) { return new Response("Oh shit", { status: 500 }); }
		num_results = users.length;

		const days_in_month = get_days_in_month();

		users.forEach(async user => {
			await update_allocation(user, days_in_month, supabase);	
		});
		page += 1;
	}

	return new Response("Success", { status: 200 })
});