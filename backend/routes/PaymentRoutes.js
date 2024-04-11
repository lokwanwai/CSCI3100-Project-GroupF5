const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const axios = require('axios');

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

        // Update the stock quantity for each item in the order
        for (const item of items) {
            try {
                // Get the current product details
                const response = await axios.get(`http://localhost:5001/api/products/getdetails/${item.productId}`);
                const product = response.data;

                // Calculate the new quantity by subtracting the ordered quantity from the current stock
                const newQuantity = product.productStorage - item.quantity;

                // Update the product quantity
                await axios.put('http://localhost:5001/api/products/changeqty', {
                    productID: item.productId,
                    quantity: newQuantity
                });
            } catch (error) {
                console.error(`Error updating quantity for item ${item.productId}:`, error);
                return res.status(500).json({ success: false, error: 'Payment processing failed' });
            }
        }

        // Create a new order document after processing other database operations
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