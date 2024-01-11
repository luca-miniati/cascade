'use client';

import React, { FC } from 'react';
import Background from '../components/background';
import Navbar from '../components/sideNavbar';
import PortfolioSection from '../components/settings/portfolio';
import MonthlyAllocation from 'app/components/settings/allocation'; 
import { ConfigProvider, theme } from 'antd';
import InvestmentStrategy from 'app/components/settings/strategy';
import Filters from 'app/components/settings/filters';

const SettingsPage: FC = () => {
    const backgroundImageUrl:string = '/gradients/02.png';

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
           }}
       >
            <main className="h-screen text-white">
                <Background url={backgroundImageUrl} flexDirection="row">
                    <Navbar navbarIndex={1} />
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-black bg-opacity-45 backdrop-blur-sm rounded-lg w-5/6 h-5/6 m-auto p-4 overflow-auto">
                            <PortfolioSection portfolioValue={3159.85} availableCashBalance={1861.58} />
                            <hr className="my-6"/>
                            <MonthlyAllocation />
                            <hr className="my-6"/>
                            <InvestmentStrategy />
                            <hr className="my-6"/>
                            <Filters />
                            <hr className="my-6"/>
                            <p className="font-semibold text-xl mb-6">Notifications</p>
                            <p>l</p>
                            <p>l</p>
                            <p>l</p>
                            <p>l</p>
                            <p>l</p>
                            <p>l</p>
                            <p>l</p>
                            <p>l</p>
                        </div>
                    </div>
                </Background>
            </main>
        </ConfigProvider>
   );
};

export default SettingsPage;
