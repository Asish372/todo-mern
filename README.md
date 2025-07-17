# MERN Todo Application

A simple and efficient ToDo application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Authentication**: Secure sign-up and login using JWT and bcrypt
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Status**: Mark tasks as complete/incomplete
- **Persistent Storage**: Tasks are stored in MongoDB Atlas
- **RESTful API**: Built with Express.js and Node.js
- **Frontend**: Developed with React.js and styled using CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd mern-todo-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd mern-todo-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Login Credentials

For testing purposes, you can use the following credentials:

- Username: `Asish`
- Password: `Asish@2002`

These credentials are pre-configured in the database. You can also create your own account using the Sign Up page.

## Technologies Used

- **MongoDB**: Database for storing tasks and user information
- **Express.js**: Backend framework for handling API requests
- **React.js**: Frontend library for building the user interface
- **Node.js**: Runtime environment for the backend
- **JWT**: JSON Web Tokens for secure authentication
- **Axios**: HTTP client for making API requests
- **React Router**: For handling navigation in the frontend

## Project Structure

- `/mern-todo-backend`: Contains the server-side code
  - `/models`: MongoDB schemas
  - `/routes`: API endpoints
  - `/middleware`: Authentication middleware
  - `server.js`: Entry point for the backend

- `/mern-todo-frontend`: Contains the client-side code
  - `/src`: Source code for the React application
    - `/components`: React components
    - `App.jsx`: Main application component
    - `index.css`: Global styles