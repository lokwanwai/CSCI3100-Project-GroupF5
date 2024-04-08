// pages/CheckOut/index.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import PaymentDetails from './PaymentDetails';
import ShippingAddress from './ShippingAddress';
import './CheckOut.css';

const CheckOut = () => {
    const location = useLocation();
    const { items } = location.state;

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container checkout-container mt-5">
            <h1>Complete your order</h1>

            <PersonalDetails />
            <PaymentDetails />
            <ShippingAddress />

            <h2 className='mt-4'>Order Summary</h2>
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
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-right">Total:</td>
                        <td>${calculateTotal().toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <div className="row button-container">
                <div className="col-md-6 col-12 mb-3">
                    <Link to="/cart" className="btn btn-rounded btn-white btn-block">
                        Back to Cart
                    </Link>
                </div>
                <div className="col-md-6 col-12">
                    <button className="btn btn-rounded btn-black btn-block">
                        Complete Purchase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;