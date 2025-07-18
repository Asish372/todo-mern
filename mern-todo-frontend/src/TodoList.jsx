import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = ({ token, setToken }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // Check if we're in demo mode
  const isDemoMode = token && token.startsWith('demo-token-');
  
  // Configure axios with auth header
  const api = axios.create({
    baseURL: window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api'
      : 'https://mern-todo-backend-asish.onrender.com/api',
    headers: { Authorization: `Bearer ${token}` }
  });
  
  // Demo tasks for fallback
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
      
      if (isDemoMode) {
        setTasks(demoTasks);
        return;
      }
      
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks(demoTasks);
      
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    try {
      if (isDemoMode) {
        const newDemoTask = {
          _id: 'demo' + Date.now(),
          title: newTask,
          completed: false
        };
        setTasks([newDemoTask, ...tasks]);
      } else {
        const res = await api.post('/tasks', { title: newTask });
        setTasks([res.data, ...tasks]);
      }
    } catch (err) {
      console.error('Error adding task:', err);
      
      // Fallback to demo mode
      const newDemoTask = {
        _id: 'demo' + Date.now(),
        title: newTask,
        completed: false
      };
      setTasks([newDemoTask, ...tasks]);
    } finally {
      setNewTask('');
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const updatedTasks = tasks.map(task => 
        task._id === id ? { ...task, completed: !completed } : task
      );
      setTasks(updatedTasks);
      
      if (!isDemoMode && !id.startsWith('demo')) {
        await api.put(`/tasks/${id}`, { completed: !completed });
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      setTasks(tasks.filter(task => task._id !== id));
      
      if (!isDemoMode && !id.startsWith('demo')) {
        await api.delete(`/tasks/${id}`);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="user-info">
          <h2>My Tasks</h2>
          <p>Welcome, {user.username || 'User'}</p>
        </div>
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
        <button type="submit" className="btn-add">Add Task</button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div className="task-list-container">
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <p>Your task list is empty</p>
              <p>Add your first task above!</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task, index) => (
                <li 
                  key={task._id} 
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="task-content">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task._id, task.completed)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <span className="task-title">{task.title}</span>
                  </div>
                  <button 
                    onClick={() => deleteTask(task._id)}
                    className="btn-delete"
                    aria-label="Delete task"
                  >
                    <span className="delete-icon">×</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;