import React, { FC, ReactNode, CSSProperties } from 'react';

interface BackgroundProps {
    url: string;
    children: ReactNode;
}

const Background: FC<BackgroundProps> = ({ url, children }) => {
    const styles: CSSProperties = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    };

  return (
    <div style={styles}>
      {children}
    </div>
  );
}

export default Background;
