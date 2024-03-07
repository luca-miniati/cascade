'use client';

import React, { FC } from 'react';
import Link from 'next/link';

const Navbar: FC = () => {
    const generateRandomState = () => {
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        const state = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        sessionStorage.setItem('state', state);
        return state;
    };

    const logInWithProsper = async () => {
        const state = generateRandomState(); 
        const clientId = process.env.NEXT_PUBLIC_PROSPER_ID ?? '';
        console.log(clientId);
        const url = `https://www.prosper.com/oauth?client_id=${clientId}&response_type=auth_key&state=${state}`;
        window.location.href = url;
    }

    return (
        <div className="shadow-md">
            <div className="w-2/3 m-auto flex flex-row justify-between items-center">
                <Link href={process.env.VERCEL_ENV ?? ''}>
                    <p className="text-4xl p-4 text-cyan-600">cascade</p>
                </Link>
                <div className="flex">
                <Link className="m-4 hover:bg-slate-100 rounded" href="/contact">
                <p className="py-2 px-3">Contact</p>
                </Link>
                { /*
                    <Link className="m-4 hover:bg-slate-100 rounded" href="/info">
                        <p className="py-2 px-3">How it Works</p>
                    </Link>
                    <Link className="m-4 hover:bg-slate-100 rounded"
                    href="/signUp">
                        <p className="py-2 px-3">Get Started</p>
                    </Link>
                    */ }
                    <button className="m-4 bg-cyan-600 hover:bg-cyan-500 rounded text-white"
                    onClick={logInWithProsper}>
                        <p className="py-2 px-3">Log In</p>
                    </button>
                </div>
            </div>
        </div>
   );
};

export default Navbar;
