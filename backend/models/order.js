const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: [{
        productId: {
            type: String,
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
        }
    }],
    shippingCost: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    customerDetails: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        cardHolderName: {
            type: String,
            required: true
        },
        cardNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    orderDateTime: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Shipping'
    }
});

module.exports = mongoose.model('Order', OrderSchema);