// productRoutes.js
const express = require('express');
const router = express.Router();

let Products = require("../models/product");

router.delete("/delete-product/:id", async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the cart item based on userEmail and productId
        const targetProduct = await Products.findOne({ productId });

        if (!targetProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the cart item
        await Products.deleteOne({ productId });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const list = await Products.find();
        res.json(list);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;