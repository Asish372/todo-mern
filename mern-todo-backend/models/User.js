// Simple User model for Render deployment
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Create a model even if MongoDB connection fails
let User;
try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', userSchema);
}

module.exports = User;