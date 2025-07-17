const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function createTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ username: 'test' });
    if (existingUser) {
      console.log('Test user already exists');
      mongoose.disconnect();
      return;
    }

    // Create a new test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      username: 'test',
      password: hashedPassword
    });
    
    await user.save();
    console.log('Test user created successfully');
  } catch (err) {
    console.error('Error creating test user:', err);
  } finally {
    mongoose.disconnect();
  }
}

createTestUser();