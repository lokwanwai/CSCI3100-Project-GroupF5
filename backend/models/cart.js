const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', CartSchema);