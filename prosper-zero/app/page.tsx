import React, { FC } from 'react';
import Background from './components/background';
import Navbar from './components/topNavbar';
import Hero from './components/hero';

const Home: FC = () => {
    const backgroundImageUrl = '/gradients/05.png';
    return (
        <main className="h-screen text-white">
            <Background url={backgroundImageUrl} flexDirection="column">
                <Navbar navbarIndex={-1}/>
                <Hero/>
            </Background>
        </main>
   );
};

export default Home;
