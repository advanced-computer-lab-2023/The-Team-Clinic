const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const FamilyMemberRoutes = require('./routes/FamilyMemberRoutes');

const app = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:3001'];

// Configure CORS with options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use('/family_members', FamilyMemberRoutes);

// MongoDB Configuration
const connectionString = "mongodb+srv://TheTeam:AclProj@aclpharmdb.ukxxvcp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});