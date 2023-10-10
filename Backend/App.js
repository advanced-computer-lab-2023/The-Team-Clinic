
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const drReqRoutes = require('./routes/drReqRoutes')
const cors = require('cors');

// Configure CORS with options
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Use the cors middleware with options BEFORE defining routes
app.use(cors(corsOptions));

//middleware
app.use(express.json())


//routes
app.use( '/api/drReq',drReqRoutes)

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

// Start the server on port
const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});





