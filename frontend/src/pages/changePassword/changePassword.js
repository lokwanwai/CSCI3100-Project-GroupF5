import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './changePasswordStyle.css'; // Ensure this CSS file is created

const ChangePassword = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
    const [otpCountdown, setOtpCountdown] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const authResponse = await axios.get('http://localhost:5001/api/auth/authenticate', { withCredentials: true });
                if (authResponse.status === 200) {  
                    setUserDetails(authResponse.data);
                } else {
                    toast.info('Please log in to change your password.');
                    navigate('/login');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
                navigate('/');
            }
        };

        authenticate();
    }, [navigate]);

    useEffect(() => {
        let interval = null;
        if (otpButtonDisabled && otpCountdown > 0) {
            interval = setInterval(() => {
                setOtpCountdown(otpCountdown - 1);
            }, 1000);
        } else if (otpCountdown === 0) {
            setOtpButtonDisabled(false);
        }
        return () => clearInterval(interval);
    }, [otpButtonDisabled, otpCountdown]);

    const handleSendOTP = async () => {
        setOtpButtonDisabled(true);
        setOtpCountdown(60);
        try {
            const response = await axios.put('http://localhost:5001/api/profile/generate-and-send-verify-otp', {
                email: userDetails.email
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Error sending OTP. Please try again.');
            setOtpButtonDisabled(false);
        }
    };

    const handleChangePassword = async () => {
        if (!otp || !newPassword) {
            toast.error('OTP and new password are required.');
            return;
        }

        try {
            await axios.put('http://localhost:5001/api/profile/changepassword', {
                email: userDetails.email,
                otp,
                newPassword
            });
            toast.success('Password changed successfully. Redirecting to profile...');
            setTimeout(() => navigate('/profile'), 3000);
        } catch (error) {
            toast.error('Failed to change password. Please try again.');
        }
    };

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="unique-change-password-container">
            <ToastContainer />
            <Header />
            <div className="unique-form-container">
                <form className="unique-change-password-form" onSubmit={(e) => e.preventDefault()}>
                    <h2>Change Password</h2>
                    <div className="unique-form-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="unique-input"
                        />
                    </div>
                    <div className="unique-form-group">
                        <input
                            type="number"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="unique-input"
                        />
                    </div>
                    <button type="button" className="unique-otp-button" onClick={handleSendOTP} disabled={otpButtonDisabled}>
                        {otpButtonDisabled ? `Re-Send OTP (${otpCountdown}s)` : 'Send OTP'}
                    </button>
                    <button type="button" className="unique-change-password-submit" onClick={handleChangePassword}>Change Password</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;
