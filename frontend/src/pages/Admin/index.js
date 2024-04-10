import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserItem from './UserItem';
import ProductItem from './ProductItem';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

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
                setIsLoggedIn(true); // Set isLoggedIn to true if token is valid
                setUserRole(data.isAdmin ? 'admin' : 'user'); // Set userRole based on the isAdmin flag
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoggedIn(false);
            });
    }, []); // The effect runs once after the component mounts

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/users`);
                setUsers(response.data);
                //console.log(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/products`);
                setProducts(response.data);
                //console.log(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5001/api/users/delete-user/${userId}`);
            setUsers(users.filter((user) => user.id !== userId));
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5001/api/products/delete-product/${productId}`);
            setProducts(products.filter((product) => product.id !== productId));
            window.location.reload();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin">
            <Header />
            <main>
                <h1>Admin Panel</h1>
                {/* {userEmail && <p>User Email: {userEmail}</p>} Display user email if available */}
                {isLoggedIn ? (
                    <>
                        {userRole === 'admin' && (
                            <>
                            <h2>User List</h2>
                            <table className="table">
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
                                            onDelete={handleDeleteUser}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <h2>Product List</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Price</th>
                                        <th>Product Image</th>
                                        <th>Product Storage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <ProductItem 
                                            key={product._id} 
                                            product={product}
                                            onDelete={handleDeleteProduct}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            </>
                        )}
                    </>
                ) : (
                    userRole === null && ( // Only show Register when no user is logged in
                        <>
                            <li>Only admin user can access this page!</li>
                        </>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Admin;
