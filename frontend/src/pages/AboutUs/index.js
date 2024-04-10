import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import './style.css';

const AboutUs = () => {

    return (
        <div className="About Us">
            <Header />
            <main>
                <h1>About Us</h1>
                <h5>Online Shopping Mall</h5>
                <p>Tel: +852 12345678</p>
                <p>E-mail: csci3100gp5@gmail.com</p>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
