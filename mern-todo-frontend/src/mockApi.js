// Mock API service using localStorage
const mockApi = {
  // Auth methods
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      // For demo purposes, accept any username/password combination
      // In a real app, you would validate against a database
      if (username && password) {
        // Generate a mock token
        const token = `mock-token-${Date.now()}`;
        // Store user info in localStorage
        localStorage.setItem('mockUser', JSON.stringify({ username }));
        resolve({ token, username });
      } else {
        reject({ message: 'Username and password are required' });
      }
    });
  },

  signup: (username, password) => {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        reject({ message: 'Username and password are required' });
        return;
      }

      // In a real app, you would check if the user already exists
      // For demo, we'll just create a new user
      resolve({ message: 'User created successfully' });
    });
  },

  // Task methods
  getTasks: (token) => {
    return new Promise((resolve) => {
      // Get tasks from localStorage or return empty array
      const tasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
      resolve(tasks);
    });
  },

  addTask: (token, title) => {
    return new Promise((resolve, reject) => {
      if (!title) {
        reject({ message: 'Title is required' });
        return;
      }

      // Get existing tasks
      const tasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
      
      // Create new task
      const newTask = {
        _id: `task-${Date.now()}`,
        title,
        completed: false,
        createdAt: new Date().toISOString()
      };

      // Add to tasks array
      tasks.push(newTask);
      
      // Save back to localStorage
      localStorage.setItem('mockTasks', JSON.stringify(tasks));
      
      resolve(newTask);
    });
  },

  updateTask: (token, id, updates) => {
    return new Promise((resolve, reject) => {
      // Get existing tasks
      const tasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
      
      // Find task index
      const taskIndex = tasks.findIndex(task => task._id === id);
      
      if (taskIndex === -1) {
        reject({ message: 'Task not found' });
        return;
      }

      // Update task
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
      
      // Save back to localStorage
      localStorage.setItem('mockTasks', JSON.stringify(tasks));
      
      resolve(tasks[taskIndex]);
    });
  },

  deleteTask: (token, id) => {
    return new Promise((resolve, reject) => {
      // Get existing tasks
      const tasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
      
      // Find task index
      const taskIndex = tasks.findIndex(task => task._id === id);
      
      if (taskIndex === -1) {
        reject({ message: 'Task not found' });
        return;
      }

      // Remove task
      tasks.splice(taskIndex, 1);
      
      // Save back to localStorage
      localStorage.setItem('mockTasks', JSON.stringify(tasks));
      
      resolve({ message: 'Task deleted' });
    });
  }
};

export default mockApi;