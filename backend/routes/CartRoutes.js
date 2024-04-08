const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.query.user;

    // Dummy Data, implement actual fetching after setup database
    const cartItems = [
        { id: 1, name: 'bag(red)', price: 20.0, quantity: 1, stock: 3 },
        { id: 2, name: 'bag(flower)', price: 15.0, quantity: 3, stock: 0 },
        { id: 3, name: 'bag(blue)', price: 25.0, quantity: 2, stock: 5 },

    ];


    // Adding the 'selected' property to each cart item and setting it to false
    const cartItemsWithSelection = cartItems.map((item) => ({ ...item, selected: false }));

    res.json(cartItemsWithSelection);
});

module.exports = router;