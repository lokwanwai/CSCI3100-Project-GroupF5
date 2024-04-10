import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './components/OrderItem';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ShoppingCart.css';


const OrderHistory = () => {
    const [items, setItems] = useState([]);


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
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/order/?user=${userEmail}`);
                setItems(response.data);
                console.log(response.data);
                console.log(items);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };
        if (userEmail) {
            fetchOrderHistory();
        }
    }, [userEmail]);


    return (
        <div className="order-history">
            <Header />
            <main className="flex-grow-1">
                <div className="container my-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Shipping cost</th>
                                            <th>Total</th>
                                            <th>Order Datetime</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <OrderItem
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderHistory;