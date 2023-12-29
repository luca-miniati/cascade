'use client';

import React, { FC } from 'react';
import Link from 'next/link';

const Logo: FC = () => {
    return (
        <Link href="/">
            <div className="inline-block p-4">
                <h1 className="text-4xl inline -tracking-widest">Prosper</h1>
                <h1 className="text-4xl text-indigo-400 inline -tracking-widest">Zero</h1>
            </div>
        </Link>
    );
};

export default Logo;
