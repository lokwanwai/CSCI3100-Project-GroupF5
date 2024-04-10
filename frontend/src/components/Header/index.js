import React, { useState } from 'react';
import './style.css';
import logo from '../../images/logo.png';

import MobileMenu from './MobileMenu';
import MenuContent from '../../pages/Admin/MenuContent';

const Header = () => {
    
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <nav className="header">
                <div className='header-container'>
                    <div className="header-image" >
                        <img className="logo" src={logo} alt='Logo'></img>
                    </div>
                    <div className="header-title">
                        <h3>SuperMall</h3>
                    </div>
                </div>
                <MenuContent/>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <MobileMenu isOpen={menuOpen}/>
                </div>
            </nav>
        </header>
    );
};

export default Header;
