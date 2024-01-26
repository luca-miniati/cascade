'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js';


const CallbackPage = () => {
    const router =  useRouter();
    const searchParams = useSearchParams();
    // const url = process.env['SUPABASE_URL'];
    // const key = process.env['SUPABASE_ANON_KEY'];
    // const supabase = createClient(url, key);
    
    useEffect(() => {
        const authKey = searchParams.get('auth_key');
        for (const key in searchParams.keys()) {
            console.log(key);
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
