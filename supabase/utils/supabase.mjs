import { createClient } from '@supabase/supabase-js';
// import 'dotenv/config';

// import { Listing } from "../functions/utils/index.ts";

const url = 'https://lszyblgydifmowjlfscg.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzenlibGd5ZGlmbW93amxmc2NnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTYyNjI2MywiZXhwIjoyMDIxMjAyMjYzfQ.hylLf473l_3nqeBunWiBzATiQXzcb1lkdMX-19kKxh0';
// const id = process.env['CLIENT_ID'] ?? '';
// const secret = process.env['CLIENT_SECRET'] ?? '';

// const listings = [];

// const url = 'https://api.prosper.com/listingsvc/v2/listings/?biddable=true&invested=false&investment_typeid=1'
// const options = {
//     headers: {
//         'Authorization': 'bearer CfiFVX4DOp9wdpguuA9ZzfDNopA',
//         'Accept': 'application/json'
//     }
// }

// const res = await fetch(url, options)
// if (!res.ok) {
//     throw new Error("Fuck");
// }

// const data = await res.json();
// for (const listing of data) {
//     listings.push(
//         new Listing(
//             listing.listing_number,
//             listing.lender_yield,
//             listing.listing_term,
//             listing.listing_status_reason,
//             0.0,
//             listing.listing_amount,
//             new Date(listing.listing_creation_date),
//             listing.prosper_rating
//         )
//     )
// }

// console.log(data)
// console.log(data.result)
const supabase = createClient(url, key);

const { data, error } = await supabase.functions.invoke('exec');
console.log(error);
console.log(data);

// const { data: { users }, list_users_error } = await supabase.auth.admin.listUsers()

// const user = users[0];
// const { data, select_error } = await supabase
//     .from('users')
//     .select()
//     .eq('user_id', user.id);

// const user_data = data[0];
// const auth_key = user_data.auth_key;

// const params = new URLSearchParams();
// params.append('grant_type', 'authorization_key');
// params.append('client_id', id);
// params.append('client_secret', secret);
// params.append('auth_key', auth_key);

// console.log(params)

// const options = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: params.toString()
// };

// const res = await fetch('https://api.prosper.com/v1/security/oauth/token', options)
//     .then(res => {
//         if (!res.ok) {
//             throw new Error(res.status);
//         }

//         return res.json();
//     })
//     .then(async data => {
//         let expires_at = new Date(Date.now() + (data.expires_in * 1000));
//         const { error } = await supabase
//             .from('users')
//             .update({
//                 access_token: data.access_token,
//                 refresh_token: data.refresh_token,
//                 expires_at: expires_at,
//             })
//             .eq('user_id', user.id);
        
//         if (error) {
//             throw new Error(error.message);
//         }

//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     });



// const prosper_data = await fetch(
//     'https://api.prosper.com/v1/accounts/prosper/?filters=AVAILABLE_CASH',
//     {
//         headers: {
//             'Authorization': 'bearer ' + 
//         }
//     }
// )