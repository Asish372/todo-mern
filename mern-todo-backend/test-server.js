const axios = require('axios');

async function testServer() {
  try {
    console.log('Testing server connection...');
    const res = await axios.get('http://localhost:5000');
    console.log('Server response:', res.data);
    console.log('Server is running correctly!');
  } catch (error) {
    console.error('Error connecting to server:');
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received. Server might not be running.');
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
  }
}

testServer();