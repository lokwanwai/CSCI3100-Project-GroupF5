const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const loginUser = require('./login');
const { checkEmail, generateAndStoreOTP, sendOTP, addNewUser } = require('./newUserReg');

// Middleware to parse JSON bodies
router.use(express.json());

// Middleware for CORS if needed
const cors = require('cors');
router.use(cors());

// Route to handle user login
router.post('/login', loginUser);

// Route to check if email is already registered
router.post('/check-email', async (req, res) => {
    try {
        const isRegistered = await checkEmail(req.body.email);
        res.json({ isRegistered });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Combined Route to generate OTP and send it to the user's email
router.post('/generate-and-send-otp', async (req, res) => {
    try {
        const email = req.body.email;
        const otp = await generateAndStoreOTP(email);
        await sendOTP(email); 
        res.json({ message: 'OTP generated and sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// // Route for re-sending OTP (can call the sendOTP function again)
// router.post('/resend-otp', async (req, res) => {
//     try {
//         await sendOTP(req.body.email); // This assumes sendOTP does not need the OTP as an argument
//         res.json({ message: 'OTP re-sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Route for adding a new user after verifying the OTP
router.post('/add-new-user', async (req, res) => {
    try {
        const newUser = await addNewUser(req.body.otp, req.body.email, req.body.name, req.body.password);
        res.json({ message: 'New user added successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to authenticate token and get user details
router.post('/authenticate', authenticateToken, (req, res) => {
    // If middleware passes, user is authenticated
    res.json({ email: req.user.email, isAdmin: req.user.isAdmin });
});

module.exports = router;
