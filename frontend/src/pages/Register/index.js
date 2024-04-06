// Register.js
import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css'; // Assuming you will use the same stylesheet for consistency

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            otp: '',
            name: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Here you would handle the registration logic
        console.log(this.state);
    }

    render() {
        return (
            <div className="Register">
                <Header />
                <div className="login-form-container">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <h2>Register</h2>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group otp-group">
                            <input
                                id="otp"
                                type="text"
                                name="otp"
                                placeholder="Enter OTP"
                                value={this.state.otp}
                                onChange={this.handleInputChange}
                                required
                            />
                            <button type="button" className="otp-button">Send OTP</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Register;
