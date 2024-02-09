import Background from '../components/background';
import Navbar from '../components/topNavbar';
import React, { FC } from 'react';
import Link from 'next/link';

const ContactPage: FC = () => {
    const backgroundImageUrl = '/gradients/02.png';
    return (
        <main className="h-screen text-white">
            <Background url={backgroundImageUrl} flexDirection='column'>
                <Navbar navbarIndex={1}/>
                <div className="flex flex-col grow justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-3/4">
                        <Link className="bg-indigo-500 hover:bg-indigo-400 w-fit rounded" href="mailto:prosperzeroinvest@gmail.com">
                            <p className="p-2 inline">Email us</p>
                        </Link>
                    </div>
                </div>
            </Background>
        </main>
   );
};

export default ContactPage;
