import React, { FC } from 'react';
import { LinkButton } from './button';

const Hero: FC = () => {
    return(
        <div className="flex flex-col grow justify-center items-center">
            <div className="flex flex-col justify-center items-center w-3/4">
                <p className="inline-block text-5xl text-center mb-4">
                    Peer-to-peer loan optimization, hands-free
                </p>
                <LinkButton text="Learn more" href="/"/>
            </div>
        </div>
    );
};

export default Hero;
