// CheckOut.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckOut = () => {
    const location = useLocation();
    const { items } = location.state;

    return (
        <div className="container">
            <h2>Checkout</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add your checkout form and other relevant components */}
        </div>
    );
};

export default CheckOut;