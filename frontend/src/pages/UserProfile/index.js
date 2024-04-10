import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import { ChangeEmail } from './ChangeEmail';

const User = () => {
    const [userEmail, setUserEmail] = useState('');

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
        const updatedUser = user.map((user) => {
            if (user.Name === userName) {
                return { ...user, userEmail: newEmail };
            }
            return user;
        });
        setUser(updatedUser);
    };

    const handlePaaswordChange = (userName, newPaasword) => {
        const updatedUser = user.map((user) => {
            if (user.Name === userName) {
                return { ...user, saltedPassword: newPaasword };
            }
            return user;
        });
        setUser(updatedUser);
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
                    product={user}
                    onDelete={handleEmailChange}
                /><li/>
                <li><ChangePassword
                    key={userName} 
                    product={user}
                    onDelete={handlePasswordChange}
                /><li/>
            </main>
            <Footer />
        </div>
    );
};

export default UserProfile;
