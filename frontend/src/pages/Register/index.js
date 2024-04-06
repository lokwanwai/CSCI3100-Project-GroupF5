import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

class RegisterInner extends Component {
    intervalId = null;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            otp: '',
            name: '',
            password: '',
            confirmPassword: '',
            otpButtonDisabled: false,
            otpCountdown: 0,
        };
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSendOTP = () => {
        const { email } = this.state;
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        this.setState({ otpCountdown: 60, otpButtonDisabled: true }, () => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.intervalId = setInterval(() => {
                this.setState(prevState => {
                    if (prevState.otpCountdown <= 1) {
                        clearInterval(this.intervalId);
                        return { otpButtonDisabled: false, otpCountdown: 0 };
                    }
                    return { otpCountdown: prevState.otpCountdown - 1 };
                });
            }, 1000);

            axios.post('http://localhost:5001/api/auth/generate-and-send-otp', { email })
                .then(response => {
                    toast.success('OTP sent successfully. Please check your email.');
                })
                .catch(error => {
                    // Reset countdown and button state if there's an error
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                        this.setState({ otpButtonDisabled: false, otpCountdown: 0 });
                    }

                    if (error.response && error.response.data.errorCode === 'EMAIL_ALREADY_REGISTERED') {
                        toast.error('You may have already registered, please login instead.');
                        setTimeout(() => this.props.navigate('/login'), 3000);
                    } else {
                        toast.error('Error sending OTP. Please try again.');
                    }
                });
        });
    }

    validateFields = () => {
        const { email, otp, name, password, confirmPassword } = this.state;
        if (!email.trim()) {
            toast.error('Email is required.');
            return false;
        }
        if (!otp.trim()) {
            toast.error('OTP is required.');
            return false;
        }
        if (!name.trim()) {
            toast.error('Full name is required.');
            return false;
        }
        if (password.length < 4 || password.includes(' ')) {
            toast.error('Password must be at least 4 characters long and cannot contain spaces.');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return false;
        }
        return true;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.validateFields()) return;

        const { email, otp, name, password } = this.state;

        try {
            const response = await axios.post('http://localhost:5001/api/auth/add-new-user', { email, otp, name, password });
            toast.success('Registration successful. Redirecting to login...');
            setTimeout(() => this.props.navigate('/login'), 3000);
        } catch (error) {
            if (error.response && error.response.data.message === 'Invalid or expired OTP') {
                toast.error('Invalid or expired OTP. Please check your OTP and try again.');
            } else {
                toast.error('Registration failed. Please check your details and try again.');
            }
        }
    }

    render() {
        const { email, otp, name, password, confirmPassword, otpButtonDisabled, otpCountdown } = this.state;

        return (
            <div className="Register">
                <ToastContainer />
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
                                value={email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group otp-group">
                            <button
                                type="button"
                                className="otp-button"
                                onClick={this.handleSendOTP}
                                disabled={otpButtonDisabled}
                            >
                                {otpButtonDisabled ? `Resend OTP (${otpCountdown}s)` : 'Send OTP'}
                            </button>
                            <input
                                id="otp"
                                type="number"
                                name="otp"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={name}
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
                                value={password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
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

function Register(props) {
    let navigate = useNavigate();
    return <RegisterInner {...props} navigate={navigate} />;
}

export default Register;
