// Entry point for Render
const app = require('./server');

// For Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});