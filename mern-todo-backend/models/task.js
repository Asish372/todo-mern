// Simple Task model for Render deployment
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

// Create a model even if MongoDB connection fails
let Task;
try {
  Task = mongoose.model('Task');
} catch (e) {
  Task = mongoose.model('Task', taskSchema);
}

module.exports = Task;