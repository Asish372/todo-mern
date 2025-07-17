const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://bindhaniasish2002:Asishbindhani2002@cluster0.dwqz4vg.mongodb.net/mern-todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

async function checkUser() {
  try {
    // List all users
    const users = await User.find({});
    console.log('All users in database:');
    users.forEach(user => {
      console.log(`- Username: ${user.username}`);
    });
    
    // Check for specific user
    const asishUser = await User.findOne({ username: 'Asish' });
    if (asishUser) {
      console.log('\nUser "Asish" exists in the database');
    } else {
      console.log('\nUser "Asish" does NOT exist in the database');
      
      // Create the user
      console.log('Creating user "Asish"...');
      const hashedPassword = await bcrypt.hash('Asish@2002', 10);
      const newUser = new User({
        username: 'Asish',
        password: hashedPassword
      });
      await newUser.save();
      console.log('User "Asish" created successfully');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

checkUser();