import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {

    return (
        <footer className="footer">
            <nav>
                <ul>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/shipping">Shipping and return policy</Link></li>
                    <li>Tel: +852 12345678</li>
                    <li>E-mail: csci3100gp5@gmail.com</li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;