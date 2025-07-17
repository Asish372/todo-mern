import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoList({ token, setToken }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if we're in demo mode
  const isDemoMode = token && token.startsWith('demo-token-');
  
  // Configure axios with auth header
  const api = axios.create({
    baseURL: 'https://mern-todo-backend-asish.onrender.com/api',
    headers: { Authorization: `Bearer ${token}` }
  });
  
  // Mock data for demo mode
  const demoTasks = [
    { _id: 'demo1', title: 'Welcome to Todo App', completed: false },
    { _id: 'demo2', title: 'This is a demo task', completed: true },
    { _id: 'demo3', title: 'Add your own tasks below', completed: false }
  ];

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      console.log('Fetching tasks with token:', token);
      
      // If in demo mode, use demo tasks
      if (isDemoMode) {
        console.log('Using demo tasks');
        setTasks(demoTasks);
        setError('');
        return;
      }
      
      const res = await api.get('/tasks');
      console.log('Tasks response:', res.data);
      setTasks(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      
      // If error, fall back to demo mode
      console.log('Falling back to demo mode');
      setTasks(demoTasks);
      
      if (err.response?.status === 401) {
        // Token expired or invalid
        console.log('Token expired or invalid, logging out');
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    try {
      console.log('Adding task:', newTask);
      
      // If in demo mode, add a demo task
      if (isDemoMode) {
        console.log('Adding demo task');
        const newDemoTask = {
          _id: 'demo' + Date.now(),
          title: newTask,
          completed: false
        };
        setTasks([...tasks, newDemoTask]);
        setNewTask('');
        return;
      }
      
      const res = await api.post('/tasks', { title: newTask });
      console.log('Add task response:', res.data);
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
      
      // If error, add a demo task anyway
      const newDemoTask = {
        _id: 'demo' + Date.now(),
        title: newTask,
        completed: false
      };
      setTasks([...tasks, newDemoTask]);
      setNewTask('');
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const task = tasks.find(t => t._id === id);
      
      // If in demo mode, update the task locally
      if (isDemoMode || id.startsWith('demo')) {
        console.log('Updating demo task');
        setTasks(tasks.map(t => t._id === id ? {...t, completed: !completed} : t));
        return;
      }
      
      const res = await api.put(`/tasks/${id}`, { 
        title: task.title, 
        completed: !completed 
      });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      // If error, update the task locally anyway
      setTasks(tasks.map(t => t._id === id ? {...t, completed: !completed} : t));
    }
  };

  const deleteTask = async (id) => {
    try {
      // If in demo mode, delete the task locally
      if (isDemoMode || id.startsWith('demo')) {
        console.log('Deleting demo task');
        setTasks(tasks.filter(task => task._id !== id));
        return;
      }
      
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      // If error, delete the task locally anyway
      setTasks(tasks.filter(task => task._id !== id));
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>My Tasks</h2>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="task-input"
        />
        <button type="submit" className="btn-add">Add</button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-spinner">Loading tasks...</div>
      ) : (
        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="no-tasks">Your task list is empty. Add your first task above!</li>
          ) : (
            tasks.map((task, index) => (
              <li 
                key={task._id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id, task.completed)}
                  />
                  <span className="task-title">{task.title}</span>
                </div>
                <button 
                  onClick={() => deleteTask(task._id)}
                  className="btn-delete"
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}