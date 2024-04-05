import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        fetch('http://localhost:5001/api/auth/authenticate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies are included in the request
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token validation failed');
            }
            setIsLoggedIn(true); // Set isLoggedIn to true if token is valid
        })
        .catch(error => {
            console.error('Error:', error);
            setIsLoggedIn(false);
        });
    }, []);

    const handleLogout = () => {
        fetch('http://localhost:5001/api/auth/logout', {
            method: 'PUT',
            credentials: 'include', // Ensure cookies, including auth tokens, are included in the request
        })
        .then(response => {
            if (response.ok) {
                setIsLoggedIn(false); // Update state to reflect the user is not logged in
                navigate('/'); // Use navigate to redirect to home page
                window.location.reload(); // Reload the page to ensure state is reset across the application
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <header className="header">
            header from components/Header/index.js
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <li onClick={handleLogout}>Logout</li> // When logged in, show Logout and attach logout function
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                    {/* Add more navigation items */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
