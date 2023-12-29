import React, { FC } from 'react';
import Background from '../components/background';
import Navbar from '../components/navbar';
import SignUp from '../components/signUp';

const Home: FC = () => {
    const backgroundImageUrl = '/gradients/02.png';
    return (
        <main className="h-screen text-white">
            <Background url={backgroundImageUrl}>
                <Navbar/>
                <SignUp/>
            </Background>
        </main>
   );
};

export default Home;
