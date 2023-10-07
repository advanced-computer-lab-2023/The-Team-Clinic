const express = require('express');
const mongoose = require('mongoose');
const PrescriptionRoutes = require('./backend /Server/Routes/PrescriptionRoutes.js');

const app = express();

app.use(express.json());

app.use('/Prescription', PrescriptionRoutes);

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

// Start the server on port
const PORT = 2002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});