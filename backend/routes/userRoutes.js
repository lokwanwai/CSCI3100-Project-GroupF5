// userRoutes.js
const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.delete('/delete-user/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;

        const targetUser = await user.findOne({ userEmail });

        console.log(userEmail);
        console.log(targetUser);

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne({ userEmail });

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