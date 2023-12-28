'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const NavbarButtons: FC = () => {
    return (
        <div className="flex space-x-8 items-center p-8">
            <Link href="/howItWorks">How it works</Link>
            <Link href="/contact">Contact</Link>
            <button onClick={() => signIn("prosper")}>
                <p>Log in</p>
            </button>
            {/* <ActionButton action={signIn} text="Sign up"/> */}
            <button className="bg-indigo w-fit rounded" onClick={() => signIn("prosper")}>
                <p className="p-2 inline">Sign up</p>
            </button>
        </div>
    );
};

export default NavbarButtons;
