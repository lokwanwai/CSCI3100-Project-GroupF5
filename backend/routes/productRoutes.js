// productRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes and handlers
router.get('/', (req, res) => {
    // Handle GET request for products
    res.send('GET request for products');
});

router.post('/', (req, res) => {
    // Handle POST request for creating a new product
    res.send('POST request for products');
});

// Export the router instance
module.exports = router;