'use client';

import React, { FC, ReactNode } from 'react';
import { Popover } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';

interface QuestionPopoverProps {
    child: ReactNode;
}

const QuestionPopover: FC<QuestionPopoverProps> = ({ child }) => {
    return (
        <Popover content={child} style={{ maxWidth: "100px" }}>
            <QuestionCircleFilled style={{ fontSize: 14, color: "#64748b" }}/>
        </Popover>
    );
};

export default QuestionPopover;
