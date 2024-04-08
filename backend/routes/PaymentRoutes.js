const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const axios = require('axios'); // Import axios for making HTTP requests

router.post('/process-payment', async (req, res) => {
    try {
        const { userEmail, items, shippingCost, total, customerDetails } = req.body;

        // Remove cart items for each item in the order
        for (const item of items) {
            try {
                await axios.delete(`http://localhost:5001/api/cart/remove-item/${item.productId}`, {
                    data: { userEmail }
                });
            } catch (error) {
                console.error(`Error removing item ${item.productId} from the cart:`, error);
                return res.status(500).json({ success: false, error: 'Payment processing failed' });
            }
        }

        for (const item of items) {
            // change stock number of each item in the database
            // wait developing of the stock management backend
        }


        // Create a new order document after process other database operations
        const order = new Order({
            userEmail: userEmail,
            items,
            shippingCost,
            total,
            customerDetails
        });

        // Save the order to the database
        await order.save();



        // Payment processing logic goes here

        res.json({ success: true });
    } catch (error) {
        console.error('Payment processing failed:', error);
        res.status(500).json({ success: false, error: 'Payment processing failed' });
    }
});

module.exports = router;