'use client';

import React, { FC } from 'react';
import QuestionPopover from '../../components/question';

interface PortfolioSectionProps {
    portfolioValue: number;
    availableCashBalance: number;
};
    
const PortfolioSection: FC<PortfolioSectionProps> = ({ portfolioValue, availableCashBalance }) => {
    const portfolioValueContent = (
        <div>
            <p>The combined value of your active notes and cash.</p>
        </div>
    );

    const availableCashBalanceContent = (
        <div>
            <p>The amount of available, uninvested cash in your portfolio.</p>
        </div>
    );

    return (
        <>
            <div className="flex items-center space-x-3">
                <p className="font-semibold text-xl">Portfolio Value: </p>
                <p className="text-xl text-slate-300">${portfolioValue}</p>
                <QuestionPopover child={portfolioValueContent} />
            </div>
            <div className="flex items-center space-x-3">
                <p className="font-semibold text-xl">Available Cash Balance: </p>
                <p className="text-xl text-slate-300">${availableCashBalance}</p>
                <QuestionPopover child={availableCashBalanceContent} />
            </div>
        </>
    );
};

export default PortfolioSection;
