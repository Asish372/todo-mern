const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login API...');
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'Asish',
      password: 'Asish@2002'
    });
    console.log('Login successful!');
    console.log('Token:', res.data.token);
  } catch (error) {
    console.error('Login failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testLogin();