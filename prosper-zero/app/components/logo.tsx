'use client';

import React, { FC } from 'react';
import Link from 'next/link';

interface LogoProps {
    url: string;
}

const Logo: FC<LogoProps> = ({ url }) => {
    return (
        <Link href={url}>
            <div className="flex items-center p-6">
                <h1 className="text-3xl inline tracking-tighter">Prosper</h1>
                <h1 className="text-3xl text-indigo-400 inline tracking-tighter">Zero</h1>
            </div>
        </Link>
    );
};

export default Logo;
