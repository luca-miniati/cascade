import Background from '../components/background';
import Navbar from '../components/navbar';
import React, { FC } from 'react';

const HowItWorksPage: FC = () => {
    const backgroundImageUrl = '/gradients/02.png';
    return (
        <main className="h-screen text-white">
            <Background url={backgroundImageUrl}>
                <Navbar/>
                <div className="flex flex-col grow justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-3/4">
                        <p className="inline-block text-5xl text-center mb-4">
                            I have no fucking idea.
                        </p>
                    </div>
                </div>
            </Background>
        </main>
   );
};

export default HowItWorksPage;
