const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function resetUser() {
  try {
    // Delete existing user if exists
    console.log('Checking for existing user "Asish"...');
    const existingUser = await User.findOne({ username: 'Asish' });
    
    if (existingUser) {
      console.log('Found existing user, deleting...');
      // Delete all tasks for this user
      await Task.deleteMany({ user: existingUser._id });
      console.log('Deleted all tasks for user');
      
      await User.deleteOne({ username: 'Asish' });
      console.log('User deleted');
    }
    
    // Create new user with known credentials
    console.log('Creating new user "Asish"...');
    const hashedPassword = await bcrypt.hash('Asish@2002', 10);
    const user = new User({
      username: 'Asish',
      password: hashedPassword
    });
    
    await user.save();
    console.log('User created successfully:');
    console.log('- Username: Asish');
    console.log('- Password: Asish@2002');
    console.log('- User ID:', user._id);
    
    // Create a sample task for the user
    const task = new Task({
      user: user._id,
      title: 'Welcome to your Todo App!',
      completed: false
    });
    
    await task.save();
    console.log('Sample task created for user');
    
    // Verify login would work
    const savedUser = await User.findOne({ username: 'Asish' });
    if (!savedUser) {
      console.log('ERROR: User not found after creation!');
      return;
    }
    
    const isMatch = await bcrypt.compare('Asish@2002', savedUser.password);
    if (isMatch) {
      console.log('Password verification successful!');
    } else {
      console.log('ERROR: Password verification failed!');
    }
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

resetUser();