const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductName: { 
        type: String, 
        required: true, 
        unique: true 
    },
    productPrice: { 
        type: String, 
        required: true 
    },
    productDescription: { 
        type: String, 
        required: true 
    },
});

module.exports = mongoose.model('Product', ProductSchema);
