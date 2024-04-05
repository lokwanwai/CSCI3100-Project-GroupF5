const express = require('express');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


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

    const token = jwt.sign(
        { email: user.userEmail, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 900000 });
    res.json({ message: 'Logged in successfully' });
}

// Export the loginUser function
module.exports = loginUser;
