import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import './style.css';

const Shipping = () => {

    return (
        <div className="Shipping">
            <Header />
            <main>
                <h1>Shipping and Return Policy</h1>
                <p>Check your order status after login. Contact 12345678 for more deatils</p>
            </main>
            <Footer />
        </div>
    );
};

export default Shipping;
