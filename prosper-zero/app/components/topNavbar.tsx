'use client';

import React, { FC } from 'react';
import Logo from './logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface navbarProps {
    navbarIndex: number;
}

const Navbar: FC<navbarProps> = ({ navbarIndex }) => {
    const router = useRouter();

    const generateRandomState = () => {
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        const state = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        return state;
    };

    const logInWithProsper = async () => {
        const state = generateRandomState(); 
        const clientId = process.env.NEXT_PUBLIC_PROSPER_ID ?? '';
        console.log(clientId);
        const url = `https://www.prosper.com/oauth?client_id=${clientId}&response_type=auth_key&state=${state}`;
        router.push(url);
    }

    return (
        <nav className="flex bg-black bg-opacity-30 justify-between items-center">
            <Logo url={"/"}/>
            <div className="flex space-x-8 items-center p-8">
                <Link className="w-fit rounded" href="howItWorks">
                    <p className={`p-2 inline ${navbarIndex === 0 ? "text-white" : "text-slate"}-400 hover:text-white text`}>How it works</p>
                </Link>
                <Link className="w-fit rounded" href="contact">
                    <p className={`p-2 inline ${navbarIndex === 1 ? "text-white" : "text-slate"}-400 hover:text-white text`}>Contact</p>
                </Link>
                <button onClick={logInWithProsper}>
                    <p className="p-2 inline text-slate-400 hover:text-white text">Log in</p>
                </button>
                <Link className="bg-indigo-500 hover:bg-indigo-400 w-fit rounded-md" href="/signUp">
                    <p className="p-2 inline">Sign up</p>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
