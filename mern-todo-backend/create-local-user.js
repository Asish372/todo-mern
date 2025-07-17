const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

// Local MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/mern-todo';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function createLocalUser() {
  try {
    // Check if user exists
    const existingUser = await User.findOne({ username: 'Asish' });
    
    if (existingUser) {
      console.log('User "Asish" already exists, deleting...');
      await Task.deleteMany({ user: existingUser._id });
      await User.deleteOne({ username: 'Asish' });
      console.log('User and tasks deleted');
    }
    
    // Create new user
    console.log('Creating user "Asish"...');
    const hashedPassword = await bcrypt.hash('Asish@2002', 10);
    const user = new User({
      username: 'Asish',
      password: hashedPassword
    });
    
    await user.save();
    console.log('User created successfully:');
    console.log('- Username: Asish');
    console.log('- Password: Asish@2002');
    
    // Create a sample task
    const task = new Task({
      user: user._id,
      title: 'Welcome to your Todo App!',
      completed: false
    });
    
    await task.save();
    console.log('Sample task created');
    
    // Test login
    const foundUser = await User.findOne({ username: 'Asish' });
    const isMatch = await bcrypt.compare('Asish@2002', foundUser.password);
    console.log('Password verification:', isMatch ? 'SUCCESS' : 'FAILED');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

createLocalUser();