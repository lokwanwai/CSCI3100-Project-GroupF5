import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Ensure this component's specific styles are loaded, if needed.
// import './style.css';

const AboutUs = () => {
    // Inline style object for left text alignment
    const leftAlignStyle = { textAlign: 'left', marginLeft: '20px' };

    return (
        <div className="AboutUs"> {/* Corrected className */}
            <Header />
            <main  style={leftAlignStyle}>
                <h1 style={leftAlignStyle}>About Us</h1>
                <h2 >Online Shopping Mall</h2>
                <p  style={leftAlignStyle}>Contact Information:</p>
                <p  style={leftAlignStyle}>Tel: +852 12345678</p>
                <p  style={leftAlignStyle}>E-mail: csci3100gp5@gmail.com</p>
                <p></p>

                <section style={leftAlignStyle}>
                    <h2 >Our Mission</h2>
                    <p>We aim to provide a seamless shopping experience, offering a wide range of quality products at competitive prices.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 >Our Vision</h2>
                    <p>To be the leading online shopping destination, renowned for an exceptional range of products and customer service.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 >Our History</h2>
                    <p>Founded in 2010, we've grown from a small startup into a major online retailer, serving customers worldwide.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 >Quality Assurance</h2>
                    <p>Quality is at the heart of everything we do. We work closely with our suppliers to ensure that all products meet our high standards.</p>
                </section>
                
                <section style={leftAlignStyle}>
                    <h2 >Customer Service</h2>
                    <p>Our customer service team is here to help you with any queries or concerns. We're committed to ensuring a positive shopping experience.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
