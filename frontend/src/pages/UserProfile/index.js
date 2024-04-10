import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';


const UserProfile = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userID, setUserID] = useState('');
    const [saltedPassword, setsaltedPassword] = useState('');
    const [Items, setItems] = useState('');


    useEffect(() => {
        // Since the token is stored in cookies, we include credentials in our fetch request.
        // The browser will automatically handle sending the appropriate cookies.
        fetch('http://localhost:5001/api/auth/authenticate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies, including auth tokens, are included in the request
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Token validation failed');
                }
                return response.json();
            })
            .then(data => {
                setUserEmail(data.email); // Set user email if token is valid
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); // The effect runs once after the component mounts

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/cart/?user=${userEmail}`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        if (userEmail) {
            fetchCartItems();
        }
    }, [userEmail]);

    const handleEmailChange = (userName, newEmail) => {
        const updatedUser = userID.map((user) => {
            if (userID.Name === userName) {
                return { ...userID, userEmail: newEmail };
            }
            return userID;
        });
        setUserEmail(updatedUser);
    };

    const handlePasswordChange = (userName, newPaasword) => {
        const updatedUser = userID.map((userID) => {
            if (userID.Name === userName) {
                return { ...userID, saltedPassword: newPaasword };
            }
            return userID;
        });
        setsaltedPassword(updatedUser);
    };
    
    return (
        <div className="user">
            <Header />
            <main>
                <h1>User Profile</h1>
                {userEmail && <p>User Email: {userEmail}</p>}
                <li><Link to="/cart">My Cart</Link></li>
                <li><Link to="/order">My order</Link></li>
                <li><ChangeEmail 
                    key={userName} 
                    user={userID}
                    onChangeEmail={handleEmailChange}
                /></li>
                <li><ChangePassword
                    key={userName} 
                    user={userID}
                    onChangePassword={handlePasswordChange}
                />
                </li>
            </main>
            <Footer />
        </div>
    );
};

export default UserProfile;
