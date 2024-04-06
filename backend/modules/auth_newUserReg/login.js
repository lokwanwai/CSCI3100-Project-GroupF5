const express = require('express');
const User = require('../../models/user');
const Session = require('../../models/cookies');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'config.config') });

// Define the login function
async function loginUser(req, res) {
    const { email, password } = req.body;
    // Adjusted to match the field name used during user creation
    const user = await User.findOne({ userEmail: email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Here, compare the provided password with the hashed password stored in the database
    // Adjusted to use the correct field for the hashed password
    const isMatch = await bcrypt.compare(password, user.saltedPassword);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    // console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
        { email: user.userEmail, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    // Modified to include isAdmin in the response
    res.cookie('token', token, {
        httpOnly: true, // Protects against XSS attacks by not allowing client-side scripts to access the cookie
        maxAge: 900000, // Cookie expiration time in milliseconds
        domain: 'localhost', // Replace 'yourdomain.com' with your actual domain to allow subdomains access
        // secure: true, // Commented out or set to false because the server is using HTTP
        sameSite: 'lax' // Can be 'strict', 'lax', or 'none'. Protects against CSRF attacks. 'lax' is a reasonable default
    });




    const expirationTime = new Date(new Date().getTime() + 900000); // Token expiration time (15 minutes)
        const session = new Session({
          userEmail: email,
          token: token,
          expiresAt: expirationTime,
        });
    
        try {
            await session.save();
            // Continue with the existing response...
        } catch (error) {
            console.error('Session save error:', error);
            return res.status(500).json({ message: 'Error saving session information' });
        }



    // Include isAdmin in the JSON response
    res.json({ message: 'Logged in successfully', isAdmin: user.isAdmin });

        
}

// Export the loginUser function
module.exports = loginUser;
