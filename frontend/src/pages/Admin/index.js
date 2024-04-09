import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

import UserItem from './UserItem';

const Admin = () => {
    const [users, setUsers] = useState([]);

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
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/users`);
                setUsers(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUsers = async (userId) => {
        try {
            await axios.delete(`http://localhost:5001/api/users/delete-user/${userId}`);
            setUsers(users.filter((item) => item.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="admin">
            <Header />
            <main>
                <h1>Admin Panel</h1>
                {userEmail && <p>User Email: {userEmail}</p>} {/* Display user email if available */}
                <h2>User List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserItem 
                                key={user._id} 
                                user={user}
                                onDelete={handleDeleteUsers}
                            />
                        ))}
                    </tbody>
                </table>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;
