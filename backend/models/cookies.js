// cookies.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('Session', sessionSchema);
