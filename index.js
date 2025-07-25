// Simple Express API for Render
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Demo login - always succeeds with these credentials
  if (username === 'Asish' && password === 'Asish@2002') {
    return res.json({
      token: 'demo-token-' + Date.now(),
      username: 'Asish'
    });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/api/tasks', (req, res) => {
  // Return demo tasks
  res.json([
    { _id: 'demo1', title: 'Welcome to Todo App', completed: false },
    { _id: 'demo2', title: 'This is a demo task', completed: true },
    { _id: 'demo3', title: 'Add your own tasks below', completed: false }
  ]);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  res.status(201).json({
    _id: 'demo' + Date.now(),
    title,
    completed: false
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const { title, completed } = req.body;
  res.json({
    _id: req.params.id,
    title: title || 'Task',
    completed: completed || false
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  res.json({ message: 'Task deleted' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});