'use client';

import React, { FC } from 'react';
import Link from 'next/link';

interface LinkButtonProps {
    text: string;
    href: string;
}

export const LinkButton: FC<LinkButtonProps> = ({ href, text }) => {
    return (
        <Link className="bg-indigo w-fit rounded" href={href}>
            <p className="p-2 inline text-slate-400 hover:text-white text">{text}</p>
        </Link>
    );
};

interface ActionButtonProps {
    text: string;
    action: Function;
}

export const ActionButton: FC<ActionButtonProps> = ({ text, action }) => {
    return (
        <button className="bg-indigo w-fit rounded" onClick={() => { action(); }}>
            <p className="p-2 inline">{text}</p>
        </button>
    );
};
