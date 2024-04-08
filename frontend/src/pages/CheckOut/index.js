// pages/CheckOut/index.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import PaymentDetails from './PaymentDetails';
import ShippingAddress from './ShippingAddress';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './CheckOut.css';

const CheckOut = () => {
    const location = useLocation();
    const { items } = location.state;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        cardHolderName: '',
        cardNumber: '',
        address: '',
    });
    const shippingCost = 10;
    const [paymentStatus, setPaymentStatus] = useState(null);
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

    const calculateSubtotal = () => {
        return items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
    };
    const calculateTotal = () => {
        return calculateSubtotal() + shippingCost;
    };
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phoneNumber ||
            !formData.cardHolderName ||
            !formData.cardNumber ||
            !formData.address
        ) {
            alert('Please fill in all the required fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (formData.cardNumber.length !== 16) {
            alert('Card number should be 16 digits long.');
            return;
        }

        try {
            // Prepare the data to send to the backend API
            const orderData = {
                items: items.map(item => ({
                    userEmail: userEmail,
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                shippingCost,
                total: calculateTotal(),
                customerDetails: formData,
            };

            // Send the data to the backend API for payment processing
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (data.success) {
                setPaymentStatus('success');
            } else {
                setPaymentStatus('error');
            }
        } catch (error) {
            console.error('Payment processing failed:', error);
            setPaymentStatus('error');
        }
    };

    return (
        <>
            <Header />
            <div className="container checkout-container mt-3">
                <h1>Complete your order</h1>
                {paymentStatus === 'success' && (
                    <div className="alert alert-success" role="alert">
                        Payment processed successfully!
                        <Link to="/Home" className="btn btn-primary ml-3">Back to Home</Link>
                    </div>
                )}
                {paymentStatus === 'error' && (
                    <div className="alert alert-danger" role="alert">
                        Payment processing failed. Please try again.
                        <br />
                        <button className=" btn-rounded btn-black" onClick={() => setPaymentStatus(null)}>Try Again</button>
                    </div>
                )}
                {paymentStatus === null && (
                    <form onSubmit={handleSubmit}>
                        <PersonalDetails formData={formData} handleInputChange={handleInputChange} />
                        <PaymentDetails formData={formData} handleInputChange={handleInputChange} />
                        <ShippingAddress formData={formData} handleInputChange={handleInputChange} />

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
                                    <td colSpan="3" className="text-right">Shipping Cost:</td>
                                    <td>${shippingCost.toFixed(2)}</td>
                                </tr>
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
                                <button type="submit" className="btn btn-rounded btn-black btn-block">
                                    Complete Purchase
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CheckOut;