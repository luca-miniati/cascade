import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

async function get_access_token(user_data, supabase) {
	if (Date.now() < user_data.expires_at.getTime() + 60000) {
		return user_data.access_token;
	} else {
		const params = new URLSearchParams();
		params.append('grant_type', 'authorization_key');
		// params.append('client_id', Deno.env.get('PROSPER_CLIENT_ID'));
		// params.append('client_secret', Deno.env.get('PROSPER_CLIENT_SECRET'));
		params.append('client_id', Deno.env.get('PROSPER_CLIENT_ID') ?? '');
		params.append('client_secret', Deno.env.get('PROSPER_CLIENT_SECRET') ?? '');
		params.append('auth_key', user_data.auth_key);

		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params.toString()
		};

		try {
			const data = await fetch('https://api.prosper.com/v1/security/oauth/token', options)
				.then(res => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.json();
				});

			const expires_at = new Date(Date.now() + (data.expires_in * 1000));
			const { error } = await supabase
				.from('users')
				.update({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
					expires_at: expires_at,
				})
				.eq('user_id', user_data.user_id);

			if (error) {
				throw new Error(error.message);
			}

			return data.access_token;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

async function get_prosper_data(access_token: string) {
	const res = await fetch(
		"https://api.prosper.com/v1/accounts/prosper/?filters=AVAILABLE_CASH",
		{
			headers: {
				"Authorization": "bearer " + access_token,
				"Accept": "application/json",
			}
		}
	);

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	return res.json();
}

async function set_allocation_schedule(user, allocation_schedule, supabase) {
	const { error } = await supabase
		.from("users")
		.update({ allocation_schedule: allocation_schedule })
		.eq("user_id", user.id);
	
	if (error) {
		throw new Error(error.message);
	}
}

async function update_allocation(user, days_in_month, supabase) {
	const { data, error } = await supabase
		.from("users")
		.select()
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

	await set_allocation_schedule(user, allocation_schedule, supabase);
}

function get_days_in_month() {
	const now = new Date();
	// Init new date object with day 0
	// This automatically gets set to last day in month, which is
	// equal to the total number of days in this month
	const days_in_month = new Date(
		now.getFullYear(),
		now.getMonth() + 1,
		0
	).getDate();

	return days_in_month;
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