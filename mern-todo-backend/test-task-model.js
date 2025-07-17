const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function testTaskModel() {
  try {
    // Find or create test user
    let user = await User.findOne({ username: 'Asish' });
    if (!user) {
      console.log('Creating test user "Asish"');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('Asish@2002', 10);
      user = new User({
        username: 'Asish',
        password: hashedPassword
      });
      await user.save();
      console.log('Test user created:', user);
    } else {
      console.log('Found existing user:', user);
    }

    // Create a test task
    console.log('Creating test task');
    const task = new Task({
      user: user._id,
      title: 'Test task ' + Date.now(),
      completed: false
    });
    
    await task.save();
    console.log('Test task created:', task);

    // Find all tasks for the user
    const tasks = await Task.find({ user: user._id });
    console.log(`Found ${tasks.length} tasks for user:`, tasks);

    // Test task model schema
    console.log('\nTask model schema:');
    console.log('- user field:', Task.schema.paths.user);
    console.log('- title field:', Task.schema.paths.title);
    console.log('- completed field:', Task.schema.paths.completed);

  } catch (err) {
    console.error('Error testing task model:', err);
  } finally {
    mongoose.disconnect();
  }
}

testTaskModel();