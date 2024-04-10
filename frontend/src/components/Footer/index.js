import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {

    return (
        <footer className="footer">
            <nav nav className="footer-nav">
                <ul className="footer-list">
                    <li className="footer-item"><Link to="/aboutus">About Us</Link></li>
                    <li className="footer-item"><Link to="/faq">FAQ</Link></li>
                    <li className="footer-item"><Link to="/shipping">Shipping and return policy</Link></li>
                    <li className="footer-item">Tel: +852 12345678</li>
                    <li className="footer-item">E-mail: csci3100gp5@gmail.com</li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;