import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../images/logo.png';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <nav className="header">
                <div className='header-container'>
                    
                    <div className="header-image" >
                        <Link to="/">
                            <img className="logo" src={logo} alt='Logo'></img>
                        </Link>
                    </div>
                    <div className="header-title">
                        <Link to="/">
                            <h3>SuperMall</h3>
                        </Link>
                    </div>
                </div>
                <div className={`menu`}>
                    <ul>
                        {/* Add your menu items here */}
                        <li><Link to="/">Home</Link></li>
                        {isLoggedIn ? (
                            <>
                                
                                <li><Link to="/profile">Profile</Link></li>
                                {userRole === 'admin' && (
                                    <li><Link to="/admin">Admin Panel</Link></li>
                                )}
                                <li><Link to="/cart">Cart</Link></li>
                                <li><Link to="/order">Order</Link></li>
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
                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen && <div className="overlay"/>}
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    {menuOpen && 
                    <div className={`popup-menu`}>
                        <ul>
                            {/* Add your menu items here */}
                            <li><Link to="/">Home</Link></li>
                            {isLoggedIn ? (
                                <>
                                    <li><Link to="/profile">Profile</Link></li>
                                    {userRole === 'admin' && (
                                        <li><Link to="/admin">Admin Panel</Link></li>
                                    )}
                                    <li><Link to="/cart">Cart</Link></li>
                                    <li><Link to="/order">Order</Link></li>
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
                    </div>}
                </div>

            </nav>
        </header>
    );
};

export default Header;
