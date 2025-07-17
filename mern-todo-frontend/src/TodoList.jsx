import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoList({ token, setToken }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Configure axios with auth header - use relative URL in production
  const baseURL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : '/api';
    
  const api = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` }
  });

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      console.log('Fetching tasks with token:', token);
      const res = await api.get('/tasks');
      console.log('Tasks response:', res.data);
      setTasks(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks: ' + (err.response?.data?.message || err.message));
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
      const res = await api.post('/tasks', { title: newTask });
      console.log('Add task response:', res.data);
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task: ' + (err.response?.data?.message || err.message));
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const task = tasks.find(t => t._id === id);
      const res = await api.put(`/tasks/${id}`, { 
        title: task.title, 
        completed: !completed 
      });
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
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