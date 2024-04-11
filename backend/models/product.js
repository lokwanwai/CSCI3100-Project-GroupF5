const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
        unique: true
    },
    productName: { 
        type: String, 
        required: true, 
    },
    productPrice: { 
        type: Number, 
        required: true 
    },
    productDescription: { 
        type: String, 
        required: true 
    },
    productImage: {
        type: String,
        default: "NoImage"
    },
    productStorage: { 
        type: Number, 
        required: true 
    },
});

module.exports = mongoose.model('Product', ProductSchema);
