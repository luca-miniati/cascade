import React, { FC, ReactNode, CSSProperties } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface BackgroundProps {
    url: string;
    flexDirection: FlexDirection;
    children: ReactNode;
}

const Background: FC<BackgroundProps> = ({ url, flexDirection, children }) => {
    const styles: CSSProperties = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: flexDirection,
        height: '100%',
    };

  return (
    <div style={styles}>
      {children}
    </div>
  );
}

export default Background;
