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
                <p>This is a shopping mall...</p>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
