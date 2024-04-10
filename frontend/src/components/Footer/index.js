import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // New state variable for storing user role

    useEffect(() => {
        fetch('http://localhost:5001/api/auth/authenticate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Token validation failed');
                }
                return response.json(); // Assuming the response contains the user's role
            })
            .then(data => {
                setIsLoggedIn(true); // Set isLoggedIn to true if token is valid
                setUserRole(data.isAdmin ? 'admin' : 'user'); // Set userRole based on the isAdmin flag
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoggedIn(false);
            });
    }, []);

    return (
        <footer className="footer">
            <nav nav className="footer-nav">
                <ul className="footer-list">
                    <div className="footer-item">
                        <li><h3>Account</h3></li>
                        {isLoggedIn ? (
                            <>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                                <li><Link to="/order">Order</Link></li>
                            </>
                        ) : (
                            userRole === null && ( // Only show Register when no user is logged in
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </>
                            )
                        )}
                    </div>
                    <div className="footer-item">
                        <li><h3>Information</h3></li>
                        <li><Link to="/aboutus">About Us</Link></li>
                    </div>
                    <div className="footer-item">
                        <li><h3>Customer Care</h3></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/shipping">Shipping and return policy</Link></li>
                    </div>
                    <div className="footer-item">
                        <li><h3>Contacts</h3></li>
                        <li>Tel: +852 12345678</li>
                        <li>E-mail: csci3100gp5@gmail.com</li>
                    </div>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;