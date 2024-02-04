'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';


const CallbackPage = () => {
    const router =  useRouter();
    const searchParams = useSearchParams();
    console.log(searchParams);
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_ANON_KEY'];
    const supabase = createClient(url, key);
    
    useEffect(() => {
        const authKey = searchParams.get('auth_key');
        const scope = searchParams.get('scope');

        if (scope) {
            if (scope != 'read_listing read_loan read_note write_invest_order write_prosper_account write_user_profile') {
                console.log('access not given');
            }
        } else {
            
            // const { data, error } = supabase.auth.signUp(user);
        }

        // const { error } = await supabase
        // .from('users')
        // .insert(user);

        // TODO: check if state is valid

        if (authKey) {
            console.log('Got Auth Key: ' + authKey);
            router.push('/');
        }

    }, [router]);

    return (
        <p>Loading...</p>
    );
}

export default CallbackPage;
