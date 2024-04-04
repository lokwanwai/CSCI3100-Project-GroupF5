import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

const Home = () => {
    return (
        <div className="home">
            <Header />
            <main>
                <h1>Home Page from pages/Home</h1>
                {/* Add your home page content */}
            </main>
            <Footer />
        </div>
    );
};

export default Home;