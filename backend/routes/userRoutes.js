// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.delete('/delete-user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const targetUser = await User.findOne({ userId });

        console.log(userID);

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ userId });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

router.get('/', async (req, res) => {

    try {
        const list = await User.find();
        res.json(list);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router instance
module.exports = router;