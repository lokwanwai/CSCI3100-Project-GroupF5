import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
    return (
        <header className="header">
            header from components/Header/index.js
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {/* Add more navigation items */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;