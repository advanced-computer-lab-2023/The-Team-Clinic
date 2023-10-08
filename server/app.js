
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json()); 


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


const UserRoutes = require('./Routes/UserRoutes');
const healthPackageRoutes = require('./Routes/HealthPackageRoutes');
const DoctorRoutes = require('./Routes/DoctorRoutes');
const PatientRoutes = require('./Routes/PatientRoutes');




app.use('/users', UserRoutes);
app.use('/health-packages', healthPackageRoutes);
app.use('/doctors', DoctorRoutes);
app.use('/patients', PatientRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
