const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  console.log('GET /tasks - User ID:', req.user.id);
  try {
    const tasks = await Task.find({ user: req.user.id });
    console.log('Tasks found:', tasks.length);
    res.json(tasks);
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
    
    const task = new Task({ user: req.user.id, title });
    await task.save();
    console.log('Task created:', task);
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
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, completed },
      { new: true }
    );
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ message: 'Task not found' });
    }
    console.log('Task updated:', task);
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
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ message: 'Task not found' });
    }
    console.log('Task deleted:', task);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;