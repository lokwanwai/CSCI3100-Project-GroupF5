const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const Session = require('../../models/cookies');
const jwt = require('jsonwebtoken');
const loginUser = require('./login');
const cors = require('cors');
const { checkEmail, generateAndStoreOTP, sendOTP, addNewUser } = require('./newUserReg');

// Middleware to parse JSON bodies
router.use(express.json());
// router.use(cors());
// Middleware for CORS if needed
// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Set to match the requesting origin
    credentials: true, // Required to include credentials like cookies
};

// Apply CORS middleware with the specified options
router.use(cors(corsOptions));
// router.use(cors());

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
router.get('/authenticate', authenticateToken, (req, res) => {
    // If middleware passes, user is authenticated
    res.json({ email: req.user.email, isAdmin: req.user.isAdmin });
});

router.put('/logout', async (req, res) => {
    // Get the token from the cookies
    const token = req.cookies['token'];
    // If no token is found in the cookies, return an error
    if (!token) {
        return res.status(401).json({ message: 'No token provided, unable to logout' });
    }

    try {
        // Delete the token record directly from the database
        await Session.deleteOne({ token: token });
        
        // Clear all cookies in the client. Adjust according to your needs.
        // Assuming the names of all possible cookies are known and are 'token', 'session_id', etc.
        res.clearCookie('token'); // Example for 'token'. Repeat for other cookies as necessary.
        // For example, if there are more cookies:
        // res.clearCookie('session_id');
        // res.clearCookie('another_cookie_name');
        
        // Return a success message
        res.json({ message: 'Logged out successfully and cookies cleared' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Error clearing cookies and logging out' });
    }
});


module.exports = router;
