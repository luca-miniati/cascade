import React, { FC } from 'react';
import Background from '../components/background';
import Navbar from '../components/topNavbar';
import SignUp from '../components/signUp';

const Home: FC = () => {
    const backgroundImageUrl = '/gradients/02.png';
    return (
        <main className="h-screen text-white">
            <Background flexDirection="column" url={backgroundImageUrl}>
                <Navbar navbarIndex={-1}/>
                <SignUp/>
            </Background>
        </main>
   );
};

export default Home;
