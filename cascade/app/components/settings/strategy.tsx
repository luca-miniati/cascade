'use client';

import React, { FC, useState } from 'react';
import { Checkbox, InputNumber, Select, Slider  } from 'antd';

interface InvestmentStrategyProps {

};

interface InvestmentStrategyOptions {
    riskTolerance: boolean;
    yield: boolean;
}

const InvestmentStrategy: FC<InvestmentStrategyProps> = () => {
    const [investmentStrategyOptions, setInvestmentStrategyOptions] = useState({
        riskTolerance: false,
        yield: false,
    });

    const prosperRatingOptions = [
        { label: "AA", value: "AA" }, 
        { label: "A", value: "A" }, 
        { label: "B", value: "B" }, 
        { label: "C", value: "C" }, 
        { label: "D", value: "D" }, 
        { label: "E", value: "E" }, 
        { label: "HR", value: "HR" }, 
    ];

    const toggleOption = (filterKey: keyof InvestmentStrategyOptions) => {
        setInvestmentStrategyOptions((prevFilters) => ({
            ...prevFilters,
            [filterKey]: !prevFilters[filterKey],
        }));
    };

    return (
        <>
            <p className="font-semibold text-xl mb-6">Investment Strategy</p>
            <div className="flex items-center my-3 space-x-6">
                <Checkbox onChange={() => { toggleOption("riskTolerance"); }}>
                </Checkbox>
                <p>Risk Tolerance</p>
                <InputNumber disabled={!investmentStrategyOptions["riskTolerance"]}/>
            </div>
        </>
    );
};

export default InvestmentStrategy;
