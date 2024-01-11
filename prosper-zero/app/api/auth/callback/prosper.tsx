'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CallbackPage = () => {
    const router =  useRouter();
    
    useEffect(() => {
        const searchParams = useSearchParams();
        const authKey = searchParams.get('auth_key');

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
