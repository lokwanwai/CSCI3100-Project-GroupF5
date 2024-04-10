import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import './style.css';

const FAQ = () => {

    return (
        <div className="FAQ">
            <Header />
            <main>
                <h1>FAQ</h1>
                <h6>Can I check if the products are shipped?</h6>
                <p>You can check the status of your previous order in Order History page after login</p>\
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
