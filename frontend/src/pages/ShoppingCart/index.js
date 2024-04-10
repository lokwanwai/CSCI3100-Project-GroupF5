import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartItem from './components/CartItem';
import CartTotal from './components/CartTotal';
import PaymentButton from './components/PaymentButton';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ShoppingCart.css';

/*
 * I finished my part(frontend, backend), but i need to have connection with other backend part(productDatabase, detailPage)
 * TODO:
 * 1. Wait for the productDatabase API to query image data/product Name/price.
 *    - Once the API is available, fetch the image data for each cart item and display it in the cart.
 *    - Update the cart item rendering logic to include the image.
 *
 * 2. Wait for the detailPage to create items into the cart database.
 *    - Ensure that the detailPage properly creates cart items when a user adds a product to the cart.
 *    - If necessary, update the cart database schema to include additional columns/data required by the detailPage.
 *      - Modify the backend API and frontend code accordingly to handle the updated schema.
 */

const ShoppingCart = () => {
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

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                let updatedQuantity = Math.max(1, Math.min(newQuantity, item.stock));
                // if (isNaN(updatedQuantity)) updatedQuantity = 1;
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5001/api/cart/remove-item/${itemId}`, { data: { userEmail } });
            setItems(items.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from the cart:', error);
        }
    };

    const handleSelectItem = (itemId) => {
        const updatedItems = items.map((item) =>
            item.id === itemId ? { ...item, selected: !item.selected } : item
        );
        setItems(updatedItems);
    };

    const calculateSubtotal = () => {
        return items
            .filter((item) => item.selected && item.stock > 0)
            .reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const shippingFee = 10;
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingFee;

    const handlePayment = () => {
        // Implement payment logic here
        console.log('Payment processed!');
    };

    return (
        <div className="shopping-cart">
            <Header />
            <main className="flex-grow-1">
                <div className="container my-4">
                    {items.length === 0 ? (
                        <div className="text-center">
                            <Link to="/">
                                <img
                                    src="/empty-cart.svg"
                                    alt="Empty Cart"
                                    style={{ width: '200px', height: 'auto' }}
                                />
                                <p className='text-center'> Your cart is empty. Click to continue shopping.</p>
                            </Link>

                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Product</th>
                                                <th>Each</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => (
                                                <CartItem
                                                    key={item.id}
                                                    item={item}
                                                    onQuantityChange={handleQuantityChange}
                                                    onRemove={handleRemoveItem}
                                                    onSelect={handleSelectItem}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-1">
                                    <CartTotal
                                        subtotal={subtotal}
                                        shippingFee={shippingFee}
                                        total={total}
                                    />
                                </div>
                                <div className="d-flex justify-content-end mt-1">
                                    <PaymentButton
                                        items={items}
                                        total={total}
                                        onPayment={handlePayment}
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShoppingCart;