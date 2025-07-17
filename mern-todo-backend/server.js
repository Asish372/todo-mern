const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Allow all origins in CORS for simplicity
app.use(cors());

// JWT Secret
const JWT_SECRET = 'secretkey';

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// For Vercel serverless functions
if (process.env.VERCEL) {
  // Export the Express app as a serverless function
  module.exports = app;
} else {
  // Start the server normally for local development
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// Export JWT_SECRET for other modules
module.exports.JWT_SECRET = JWT_SECRET;
