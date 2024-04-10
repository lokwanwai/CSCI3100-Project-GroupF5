import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const MenuContent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // New state variable for storing user role
    const navigate = useNavigate();

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

    const handleLogout = () => {
        fetch('http://localhost:5001/api/auth/logout', {
            method: 'PUT',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    setIsLoggedIn(false);
                    setUserRole(null); // Reset user role on logout
                    navigate('/');
                    window.location.reload();
                } else {
                    throw new Error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={`menu`}>
            <ul>
                {/* Add your menu items here */}
                <li><Link to="/">Home</Link></li>
                {isLoggedIn ? (
                    <>
                        {userRole === 'user' && (
                            <li><Link to="/profile">Profile</Link></li>
                        )}
                        {userRole === 'admin' && (
                            <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/admin">Admin Panel</Link></li>
                            </>
                        )}
                        <li><Link to="/cart">Cart</Link></li>
                        <li onClick={handleLogout}><Link>Logout</Link></li>
                    </>
                ) : (
                    userRole === null && ( // Only show Register when no user is logged in
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )
                )}
            </ul>
        </div>
    );
};

export default MenuContent;