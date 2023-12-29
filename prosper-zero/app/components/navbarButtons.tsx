'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const NavbarButtons: FC = () => {
    return (
        <div className="flex space-x-8 items-center p-8">
            <Link className="w-fit rounded" href="howItWorks">
                <p className="p-2 inline text-slate-400 hover:text-white text">How it works</p>
            </Link>
            <Link className="w-fit rounded" href="contact">
                <p className="p-2 inline text-slate-400 hover:text-white text">Contact</p>
            </Link>
            <button onClick={() => signIn("prosper")}>
                <p className="p-2 inline text-slate-400 hover:text-white text">Log in</p>
            </button>
            <Link className="bg-indigo-500 hover:bg-indigo-400 w-fit rounded-md" href="/signUp">
                <p className="p-2 inline">Sign up</p>
            </Link>
        </div>
    );
};

export default NavbarButtons;
