import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

const Login = () => {
    return (
        <div className="Login">
            <Header />
            <main>
                <h1>Login Page from pages/Login</h1>
                {/* Add your home page content */}
            </main>
            <Footer />
        </div>
    );
};

export default Login;