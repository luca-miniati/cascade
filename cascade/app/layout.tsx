import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cascade',
    description: '',
};

export default function RootLayout({
        children,
    }: {
        children: React.ReactNode
    }) {
        return (
        <html lang="en" className="dark">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#59afbc',
                        borderRadius: 4,
                        fontFamily: 'Montserrat',
                    },
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <body className={`${font.className} overscroll-none box-border`}>
                    <AntdRegistry>
                        {children}
                    </AntdRegistry>
                </body>
            </ConfigProvider>
        </html>
    );
};
