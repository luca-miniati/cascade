import React, { FC } from 'react';
import Link from 'next/link';

const Hero: FC = () => {
    return(
        <div className="flex flex-col grow justify-center items-center">
            <div className="flex flex-col justify-center items-center w-3/4">
                <p className="inline-block text-5xl text-center mb-4">
                    Peer-to-peer loan optimization, hands-free
                </p>
                <Link className="bg-indigo-500 hover:bg-indigo-400 w-fit rounded" href="howItWorks">
                    <p className="p-2 inline">Learn more</p>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
