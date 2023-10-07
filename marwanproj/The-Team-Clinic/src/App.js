// Require and configure dotenv to load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

//to be able to understand the json files in requests
app.use(express.json());

// MongoDB Configuration
const connectionString = process.env.MONGODB_URI ;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const FamilyMemberRoutes = require('./routes/FamilyMemberRoutes');


// Define routes for the application
app.use('/family_members', FamilyMemberRoutes);


// Start the server on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
