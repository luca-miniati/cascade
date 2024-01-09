import React, { FC } from 'react';
import Background from '../components/background';
import Navbar from '../components/sideNavbar';

const HistoryPage: FC = () => {
    const backgroundImageUrl:string = '/gradients/05.png';

    return (
        <main className="h-screen text-white">
            <Background url={backgroundImageUrl} flexDirection="row">
                <Navbar navbarIndex={2} />
                <div className="w-full">
                </div>
            </Background>
        </main>
   );
};

export default HistoryPage;
