// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {

    try {
        const userList = await User.find();

        const formattedUsers = userList.map((user) => ({
            id: user._id,
            email: user.userEmail,
            name: user.userName,
        }));
        
        res.json(formattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router instance
module.exports = router;