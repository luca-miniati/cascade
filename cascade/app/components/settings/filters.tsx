'use client';

import React, { FC, useState } from 'react';
import { Checkbox, InputNumber, Select, Slider  } from 'antd';

interface FiltersProps {

};

interface LoanFilters {
    yield: boolean,
    prosperRating: boolean,
    loanTerm: boolean,
    coBorrower: boolean,
    loanAmount: boolean,
    loanPurpose: boolean,
    debtToIncome: boolean,
    statedIncome: boolean,
    statedEmploymentStatus: boolean,
    outstandingMortgage: boolean,
    ficoScore: boolean,
    revolvingCreditBalance: boolean,
    currentDelinquencies: boolean,
    amountDelinquent: boolean,
    delinquenciesLast7Years: boolean,
}

const Filters: FC<FiltersProps> = () => {
    const [filtersEnabled, setfiltersEnabled] = useState<LoanFilters>({
        yield: false,
        prosperRating: false,
        loanTerm: false,
        coBorrower: false,
        loanAmount: false,
        loanPurpose: false,
        debtToIncome: false,
        statedIncome: false,
        statedEmploymentStatus: false,
        outstandingMortgage: false,
        ficoScore: false,
        revolvingCreditBalance: false,
        currentDelinquencies: false,
        amountDelinquent: false,
        delinquenciesLast7Years: false,
    });

    const filtersTitle: object = {
        yield: "Yield",
        prosperRating: "Prosper Rating",
        loanTerm: "Loan Term",
        loanAmount: "Loan Amount",
        loanPurpose: "Loan Purpose",
        debtToIncome: "Debt-to-Income Ratio",
        statedIncome: "Stated Income",
        statedEmploymentStatus: "Stated Employment Status",
        coBorrower: "Exclude Co-Borrowers",
        outstandingMortgage: "Exclude Outstanding Mortgage",
        ficoScore: "FICO Score",
        revolvingCreditBalance: "Revolving Credit Balance",
        currentDelinquencies: "Current Delinquencies",
        amountDelinquent: "Amount Delinquent",
        delinquenciesLast7Years: "Delinquencies (Last 7 Years)",
    };

    const filtersContent = {
        yield: "",
        prosperRating: "",
        loanTerm: "",
        coBorrower: "",
        loanAmount: "",
        loanPurpose: "",
        debtToIncome: "",
        statedIncome: "",
        statedEmploymentStatus: "",
        outstandingMortgage: "",
        ficoScore: "",
        revolvingCreditBalance: "",
        currentDelinquencies: "",
        amountDelinquent: "",
        delinquenciesLast7Years: "",
    };

    const [filtersRangeBounds, setFiltersRangeBounds] = useState({
        yield: [0, 36],
        ficoScore: [0, 800],
    });

    const filtersRangeBoundsInitial = filtersRangeBounds;

    const prosperRatingOptions = [
        { label: "AA", value: "AA" }, 
        { label: "A", value: "A" }, 
        { label: "B", value: "B" }, 
        { label: "C", value: "C" }, 
        { label: "D", value: "D" }, 
        { label: "E", value: "E" }, 
        { label: "HR", value: "HR" }, 
    ];

    const toggleOption = (filterKey: keyof LoanFilters) => {
        setfiltersEnabled((prevFilters) => ({
            ...prevFilters,
            [filterKey]: !prevFilters[filterKey],
        }));
    };

    return (
        <>
            <p className="font-semibold text-xl mb-6">Loan Filters</p>
            <div className="my-3">
                <div className="flex space-x-6 my-2 items-center">
                    <Checkbox onChange={() => { toggleOption("yield"); }}>
                    </Checkbox>
                    <p>Yield</p>
                </div>
                { filtersEnabled["yield"] ?
                <div className="flex space-x-6 items-center">
                    <InputNumber
                        className="w-24"
                        addonAfter="%"
                        defaultValue={filtersRangeBounds["yield"][0]}
                        onChange={(value) => {
                            setFiltersRangeBounds((prevRangeBounds) => ({
                                ...prevRangeBounds,
                                ["yield"]: [value ?? prevRangeBounds["yield"][0], prevRangeBounds["yield"][1]],
                            }));
                        }}
                    />
                    <Slider
                        className="grow"
                        range={true}
                        min={filtersRangeBounds["yield"][0]}
                        max={filtersRangeBounds["yield"][1]}
                        defaultValue={[filtersRangeBoundsInitial["yield"][0], filtersRangeBoundsInitial["yield"][1]]}
                        step={0.01}
                        // tooltip={{ open: false }}
                    />
                    <InputNumber
                        className="w-24"
                        addonAfter="%"
                        defaultValue={filtersRangeBounds["yield"][1]}
                    />
                </div> : undefined }
            </div>
            <div className="my-3">
                <div className="flex space-x-6 my-2 items-center">
                    <Checkbox onChange={() => { toggleOption("ficoScore"); }}>
                    </Checkbox>
                    <p>FICO Score</p>
                </div>
                { filtersEnabled["ficoScore"] ?
                <div className="flex space-x-6 items-center">
                    <InputNumber
                        className="w-24"
                        addonAfter="%"
                        defaultValue={filtersRangeBounds["yield"][0]}
                    />
                    <Slider className="grow" range={true} min={7} max={36} defaultValue={[7, 36]} step={0.01} tooltip={{ open: false }}/>
                    <InputNumber
                        className="w-24"
                        addonAfter="%"
                        defaultValue={filtersRangeBounds["yield"][1]}
                    />
                </div> : undefined }
            </div>
        </>
    );
};

export default Filters;
