const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail: { 
        type: String, 
        required: true, 
        unique: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    saltedPassword: { 
        type: String, 
        required: true 
    },
    isAdmin: { 
        type: Boolean, 
        required: true 
    }
});

module.exports = mongoose.model('user', userSchema);
