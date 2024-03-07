import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function update_allocation(user, supabase) {
	const { data, error } = await supabase
		.from("users")
		.select()
		.eq("user_id", user.id);
	if (error) {
		return new Response("Oh fuck", { status: 500 });
	}

	const user_data = data[0];
	const auth_key = user_data.auth_key;
	const monthly_allocation = user_data.monthly_allocation;

	try {
		const user_data_prosper = await fetch(
			"https://api.prosper.com/v1/accounts/prosper/?filters=AVAILABLE_CASH",
			{
				headers: {
					"Authorization": "bearer" + auth_key,
					"Accept": "application/json",
				}
			}
		);
	} catch {
		return new Response("God dammit", { status: 500 })
	}
}

Deno.serve(async () => {
	let page = 1;
	let num_results = 50;
	while (num_results >= 50) {
		const url = Deno.env.get("SUPABASE_URL");
		const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
		const supabase = createClient(url, key);

		const { data: { users }, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 50 });
		if (error) {
			return new Response("Oh shit", { status: 500 });
		}

		num_results = users.length;

		const now = new Date();
		// Init new date object with day 0
		// This automatically gets set to last day in month, which is
		// equal to the total number of days in this month
		const days_in_month = new Date(
			now.getFullYear(),
			now.getMonth() + 1,
			0
		).getDate();

		users.forEach(async user => {
			await update_allocation(user, supabase);	
		});
	}
});