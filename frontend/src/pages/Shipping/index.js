import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Ensure this component's specific styles are loaded, if needed.
// import './style.css';

const Shipping = () => {
    // Inline style object for left text alignment
    const leftAlignStyle = { textAlign: 'left', marginLeft: '20px' };

    return (
        <div className="Shipping" >
            <Header />
            <main style={leftAlignStyle}>
                <h1 style={leftAlignStyle}>Shipping and Return Policy</h1>
                <p>Check your order status after login. For more details, contact us at 12345678.</p>
                
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Shipping Options</h2>
                    <p>We offer several shipping options, including Standard Shipping, Express Shipping, and Next-Day Delivery. Shipping costs may vary based on your location and the option chosen.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Tracking Your Order</h2>
                    <p>Once your order is shipped, you will receive a tracking number via email. Use this number on our website to track your order's progress.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Return Policy</h2>
                    <p>Items can be returned within 30 days of receipt. Items must be in original condition, and return shipping fees may apply.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Exchanges</h2>
                    <p>We accept exchanges for items of the same value. Please return the original item and place a new order for the replacement.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Exceptions</h2>
                    <p>Some items, such as final sale items and custom-made products, may not be eligible for return or exchange. Please check the product details for specific return information.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Shipping;
