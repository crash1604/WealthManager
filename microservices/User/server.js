require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const UserController = require('./controllers/UserController');
const auth = require('./middleware/auth');

const app = express();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(bodyParser.json());
app.use(cookieParser()); // Enable cookie parsing

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'your_mongo_uri';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
    connectTimeoutMS: 10000, // Timeout for initial connection
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.post('/api/users/register', UserController.register);
app.post('/api/users/login', UserController.login);
app.get('/api/users/profile', auth, UserController.getProfile);
app.put('/api/users/profile', auth, UserController.updateProfile);
app.post('/api/users/logout', auth, UserController.logout);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
