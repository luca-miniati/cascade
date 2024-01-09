import React, { FC } from 'react';
import Background from '../components/background';
import Navbar from '../components/sideNavbar';

const Dashboard: FC = () => {
    const backgroundImageUrl:string = '/gradients/05.png';

    return (
        <main className="h-screen text-white">
            <Background url={backgroundImageUrl} flexDirection="row">
                <Navbar navbarIndex={0} />
                <div className="w-full">
                </div>
            </Background>
        </main>
   );
};

export default Dashboard;
