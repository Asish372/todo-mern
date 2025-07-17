const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function createUser() {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: 'Asish' });
    if (existingUser) {
      console.log('User "Asish" already exists');
      mongoose.disconnect();
      return;
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash('Asish@2002', 10);
    const user = new User({
      username: 'Asish',
      password: hashedPassword
    });
    
    await user.save();
    console.log('User "Asish" created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    mongoose.disconnect();
  }
}

createUser();