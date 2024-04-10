import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './UserProfile.css';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const authResponse = await fetch('http://localhost:5001/api/auth/authenticate', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!authResponse.ok) {
                    alert('Please log in to view your profile.');
                    navigate('/login');
                } else {
                    const authData = await authResponse.json();

                    // Fetch user profile details using POST request with JSON body
                    const profileResponse = await axios.put('http://localhost:5001/api/profile/getdetails', {
                        email: authData.email
                    });

                    setUserDetails(profileResponse.data);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                navigate('/');
            }
        };

        authenticate();
    }, [navigate]);

    const getRole = (isAdmin) => isAdmin ? 'Admin' : 'User';

    const handleChangeName = () => {
        // Implement change name functionality
        console.log('Change Name clicked');
    };

    const handleChangePassword = () => {
        // Implement change password functionality
        console.log('Change Password clicked');
    };

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <Header />
            <div className="user-profile-container">
                <main className="user-profile-main">
                    <h1>User Profile</h1>
                    <div className="profile-details">
                        <table>
                            <tbody>
                                <tr>
                                    <td>User Email:</td>
                                    <td>{userDetails.userEmail}</td>
                                </tr>
                                <tr>
                                    <td>User Name:</td>
                                    <td>{userDetails.userName}</td>
                                </tr>
                                <tr>
                                    <td>Role:</td>
                                    <td>{getRole(userDetails.isAdmin)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="profile-actions">
                        <div className="profile-actions-row">
                            <button className="btn-primary" onClick={() => navigate('/cart')}>Shopping Cart</button>
                            <button className="btn-primary" onClick={() => navigate('/order')}>Order</button>
                        </div>
                        <div className="profile-actions-row">
                            <button className="btn-secondary" onClick={() => navigate('/editname')}>Change User Name</button>
                            <button className="btn-secondary" onClick={() => navigate('/editpw')}>Change Password</button>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;