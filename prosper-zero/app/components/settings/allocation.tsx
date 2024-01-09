'use client';

import React, { FC, useState } from 'react';
import { Radio, InputNumber, Button } from 'antd';
import QuestionPopover from '../../components/question';

interface MonthlyAllocationProps {
};
    
const MonthlyAllocation: FC<MonthlyAllocationProps> = () => {
    const [allocationType, setAllocationType] = useState("relativeAmount");
    const monthlyAllocationContent = (
        <div>
            <p>
                How much cash to allocate for investing, refreshed every<br />
                month. If cash is left over after a month, it does not carry<br />
                over; the next cycle's allocation is determined by the<br />
                Relative/Fixed Amount.
            </p>
        </div>
    );

    return (
        <>
            <div className="flex space-x-3 items-center mb-6">
                <p className="font-semibold text-xl inline-block">Monthly Allocation</p>
                <QuestionPopover child={monthlyAllocationContent} />
            </div>
            <div className="my-3">
                <Radio.Group defaultValue={allocationType} buttonStyle="solid" onChange={(e) => { setAllocationType(e.target.value); }}>
                    <Radio.Button value="relativeAmount">Relative Amount</Radio.Button>
                    <Radio.Button value="fixedAmount">Fixed Amount</Radio.Button>
                </Radio.Group>
            </div>
            {allocationType === "relativeAmount"
            ?
            <div className="my-3 inline-block">
                <InputNumber addonAfter="%" className="mr-6"/>
                <Button type="primary">Save</Button>
                <p className="mt-2 text-xs text-slate-300">Percentage of available cash to be invested each month.</p>
                <p className="mt-2 text-xs text-slate-300">Min. 0%, Max. 100%</p>
            </div>
            :
            // TODO: Add error property, also gray out save button when error
            <div className="my-3 inline-block">
                <InputNumber addonAfter="$" className="mr-6"/>
                <Button type="primary">Save</Button>
                <p className="mt-2 text-xs text-slate-300">Fixed amount of available cash to be invested each month.</p>
                <p className="mt-2 text-xs text-slate-300">Min. $0.00, Max. $1,861.58</p>
            </div>
            }
        </>
    );
};

export default MonthlyAllocation;
