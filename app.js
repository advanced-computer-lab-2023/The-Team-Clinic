// 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
// const medsRoutes = require('./Routes/medsroutes'); 
// const healthPackageRoutes = require('./Routes/HealthPackageRoutes');
// const UserRoutes = require('./Routes/UserRoutes');
// const pharmcistReqRoutes = require('./Routes/pharmcistReqRoutes');
// const PharmacistRoutes = require('./Routes/PharmacistRoutes'); 
// const PatientRoutes = require('./Routes/PatientRoutes'); 
const PrescriptionRoutes = require('./backend /Routes/PrescriptionRoutes.js');
const Adminroutes = require('./backend /Routes/Adminroutes.js');


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

// app.use('/meds', medsRoutes);
// app.use('/health-packages', healthPackageRoutes);
// app.use('/users', UserRoutes);
// app.use('/api/pharmcistReq', pharmcistReqRoutes);
// app.use('/patients', PatientRoutes);
// app.use('/pharmacists', PatientRoutes);
app.use('/Prescription',PrescriptionRoutes);
app.use('/admin',Adminroutes);

// MongoDB Configuration
const connectionString = "mongodb+srv://TheTeam:AclProj@aclpharmdb.ukxxvcp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});