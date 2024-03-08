import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env['SUPABASE_URL'] ?? '';
const key = process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '';
const id = process.env['CLIENT_ID'] ?? '';
const secret = process.env['CLIENT_SECRET'] ?? '';
const supabase = createClient(url, key);

const { data: { users }, list_users_error } = await supabase.auth.admin.listUsers()

const user = users[0];
const { data, select_error } = await supabase
    .from('users')
    .select()
    .eq('user_id', user.id);

const user_data = data[0];
const auth_key = user_data.auth_key;

const params = new URLSearchParams();
params.append('grant_type', 'authorization_key');
params.append('client_id', id);
params.append('client_secret', secret);
params.append('auth_key', auth_key);

console.log(params)

const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
};

const res = await fetch('https://api.prosper.com/v1/security/oauth/token', options)
    .then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        }

        return res.json();
    })
    .then(async data => {
        let expires_at = new Date(Date.now() + (data.expires_in * 1000));
        const { error } = await supabase
            .from('users')
            .update({
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_at: expires_at,
            })
            .eq('user_id', user.id);
        
        if (error) {
            throw new Error(error.message);
        }

        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });



// const prosper_data = await fetch(
//     'https://api.prosper.com/v1/accounts/prosper/?filters=AVAILABLE_CASH',
//     {
//         headers: {
//             'Authorization': 'bearer ' + 
//         }
//     }
// )