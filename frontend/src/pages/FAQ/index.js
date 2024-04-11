import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Ensure this component's specific styles are loaded, if needed.
// import './style.css';

const FAQ = () => {
    // Inline style object for left text alignment
    const leftAlignStyle = { textAlign: 'left', marginLeft: '20px' };

    return (
        <div className="FAQ" >
            <Header />
            <main style={leftAlignStyle}>
                <h1 style={leftAlignStyle}>FAQ</h1>
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Ordering & Shipping</h2>
                    {/* Existing questions */}
                    
                    {/* Additional questions */}
                    <div className="faq-item" style={leftAlignStyle}>
                        <h6>What payment methods are accepted?</h6>
                        <p>We accept various payment methods including credit/debit cards, PayPal, and gift vouchers.</p>
                    </div>
                </section>
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Returns & Refunds</h2>
                    {/* Existing questions */}
                    
                    {/* Additional questions */}
                    <div className="faq-item" style={leftAlignStyle}>
                        <h6>What is the process for exchanging an item?</h6>
                        <p>To exchange an item, please return the original item for a refund and place a new order for the desired product.</p>
                    </div>
                </section>
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Product Information</h2>
                    {/* Existing questions */}
                    
                    {/* Additional questions */}
                    <div className="faq-item" style={leftAlignStyle}>
                        <h6>How do I care for my products?</h6>
                        <p>Each product page includes specific care instructions. Generally, we recommend gentle washing and avoiding the use of bleach.</p>
                    </div>
                </section>
                <section style={leftAlignStyle}>
                    <h2 style={leftAlignStyle}>Loyalty Program</h2>
                    <div className="faq-item" style={leftAlignStyle}>
                        <h6>Do you have a loyalty program?</h6>
                        <p>Yes, we offer a loyalty program for our customers. You can earn points with each purchase and redeem them for discounts on future orders.</p>
                    </div>
                    <div className="faq-item" style={leftAlignStyle}>
                        <h6>How can I join the loyalty program?</h6>
                        <p>Joining is free and easy! Sign up on our website to start earning points immediately with your next purchase.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
