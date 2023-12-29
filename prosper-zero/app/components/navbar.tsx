import React, { FC } from 'react';
import Logo from './logo';
import NavbarButtons from './navbarButtons';

const Navbar: FC = () => {
  return (
    <nav className="flex justify-between items-center">
        <Logo/>
        <NavbarButtons/>
    </nav>
  );
}

export default Navbar;
