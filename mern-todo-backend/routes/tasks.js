const express = require('express');
// Use mock Task model instead of requiring the actual model
const Task = {
  find: () => Promise.resolve([]),
  findOneAndUpdate: () => Promise.resolve(null),
  findOneAndDelete: () => Promise.resolve(null)
};

// Simple auth middleware
const auth = (req, res, next) => {
  req.user = { id: 'demo-user' };
  next();
};

const router = express.Router();

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  console.log('GET /tasks - User ID:', req.user.id);
  try {
    // Return demo tasks instead of querying the database
    const demoTasks = [
      { _id: 'demo1', title: 'Welcome to Todo App', completed: false, user: req.user.id },
      { _id: 'demo2', title: 'This is a demo task', completed: true, user: req.user.id },
      { _id: 'demo3', title: 'Add your own tasks below', completed: false, user: req.user.id }
    ];
    console.log('Demo tasks returned');
    res.json(demoTasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create new task
router.post('/', auth, async (req, res) => {
  console.log('POST /tasks - User ID:', req.user.id);
  console.log('Request body:', req.body);
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    // Create a demo task instead of saving to database
    const task = {
      _id: 'demo' + Date.now(),
      user: req.user.id,
      title,
      completed: false
    };
    console.log('Demo task created:', task);
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update task (mark complete/incomplete or edit title)
router.put('/:id', auth, async (req, res) => {
  console.log('PUT /tasks/:id - User ID:', req.user.id, 'Task ID:', req.params.id);
  console.log('Request body:', req.body);
  try {
    const { title, completed } = req.body;
    
    // Return a demo updated task
    const task = {
      _id: req.params.id,
      user: req.user.id,
      title: title || 'Updated task',
      completed: completed || false
    };
    
    console.log('Demo task updated:', task);
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  console.log('DELETE /tasks/:id - User ID:', req.user.id, 'Task ID:', req.params.id);
  try {
    // Just return success message for demo
    console.log('Demo task deleted, ID:', req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;