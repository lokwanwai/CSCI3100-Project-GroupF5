import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Footer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // New state variable for storing user role
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <nav>
                <ul>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
