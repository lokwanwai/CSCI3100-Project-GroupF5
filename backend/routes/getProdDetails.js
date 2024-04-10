const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route: "/prod/details"
// Method: GET
// Parameter: productID
// Function: Return the entire Object
router.get('/prod/details/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await Product.findOne({ productID });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: "/prod/changeqty"
// Method: PUT
// Parameters: productID, Quantity
// Function: Set the product quantity to the input Quantity
router.put('/prod/changeqty', async (req, res) => {
  try {
    const { productID, quantity } = req.body;
    const product = await Product.findOne({ productID });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.productStorage = quantity;
    await product.save();
    res.json({ message: 'Product quantity updated successfully' });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: "prod/image"
// Method: Get
// Parameters: productID
// Function: get the productImage (it is a path) using the productID, then, return the image stored in the path acquired
router.get('/prod/image/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await Product.findOne({ productID });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const imagePath = product.productImage;
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;