// userRoutes.js
const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.delete('/delete-user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the cart item based on userEmail and productId
        const targetUser = await user.findOne({ userId });

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the cart item
        await user.deleteOne({ userId });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

router.get('/', async (req, res) => {

    try {
        const list = await user.find();
        res.json(list);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Export the router instance
module.exports = router;