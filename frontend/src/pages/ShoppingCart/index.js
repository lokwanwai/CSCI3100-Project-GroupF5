import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './components/CartItem';
import CartTotal from './components/CartTotal';
import PaymentButton from './components/PaymentButton';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ShoppingCart.css';



const ShoppingCart = () => {
    const [items, setItems] = useState([]);
    const userId = 1;

    // Fetch cart items from the server
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/cart/?user=${userId}`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, [userId]);


    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                const updatedQuantity = Math.max(1, Math.min(newQuantity, item.stock));
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleRemoveItem = (itemId) => {
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
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
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShoppingCart;