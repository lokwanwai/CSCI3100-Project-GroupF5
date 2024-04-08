const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Remove a cart item
router.delete('/remove-item/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { userEmail } = req.body;

        // Find the cart item based on userEmail and productId
        const cartItem = await Cart.findOne({ userEmail, productId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Remove the cart item
        await Cart.deleteOne({ userEmail, productId });

        res.json({ message: 'Item removed from the cart successfully' });
    } catch (error) {
        console.error('Error removing item from the cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    const userEmail = req.query.user;

    try {
        const cartItems = await Cart.find({ userEmail });

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const formattedCartItems = cartItems.map((item) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            stock: item.stock,
            selected: false,
        }));

        res.json(formattedCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;