const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://mern-todo-app-asish372.vercel.app'],
  credentials: true
}));

// MongoDB connection string - uses Atlas in production, local in development
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// JWT Secret
const JWT_SECRET = 'secretkey';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = { JWT_SECRET };
