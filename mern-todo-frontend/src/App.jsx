import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import TodoList from './TodoList'
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Todo App</h1>
        <Routes>
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <TodoList token={token} setToken={setToken} /> : <Navigate to="/login" />} />
        </Routes>
        <footer className="app-footer">
          <p>This Application is Made by Asish Bindhani</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
