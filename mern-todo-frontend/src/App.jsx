import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Todo App</h1>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
            <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
            <Route path="/" element={token ? <TodoList token={token} setToken={setToken} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>MERN Todo Application by Asish Bindhani</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;