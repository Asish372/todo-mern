const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function verifySetup() {
  try {
    // Check if user exists
    const user = await User.findOne({ username: 'Asish' });
    if (user) {
      console.log('✅ User "Asish" exists');
    } else {
      console.log('❌ User "Asish" does not exist');
    }

    // Count total users
    const userCount = await User.countDocuments();
    console.log(`Total users in database: ${userCount}`);

    // Count tasks
    const taskCount = await Task.countDocuments();
    console.log(`Total tasks in database: ${taskCount}`);

    console.log('\nVerification complete!');
    console.log('Login credentials:');
    console.log('- Username: Asish');
    console.log('- Password: Asish@2002');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    mongoose.disconnect();
  }
}

verifySetup();