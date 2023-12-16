const mongoose= require('mongoose');
//const Notification = require('../Models/notifications');
//const pharmacistModel = require('../Models/pharmacists');
//const pharmacists = require('../Models/pharmacists');
//const notifications = require('../Models/notifications');
const Notification = require('../Models/notifications');
const Pharmacist = require('../Models/pharmacists');

  
exports.getPharmNotifications = async (req, res) => {
    try {
      const pharmNotifications = await Notification.find({ receiver: 'Pharm' });
      res.status(200).json(pharmNotifications);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.addNotificationPharm = async (req, res) => {
    try {
      const {  content } = req.body; // Assuming you pass receiver and content in the request body
  
      // Validate receiver value if needed
  
      const newNotification = new Notification({
        receiver: 'Pharm',
        time: new Date(),
        content: `${content} is out of stock`,
        title: 'Confirmed', // Set the title to 'Confirmed'
      });
  
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  // notificationController.js

const nodemailer = require('nodemailer');


// Set up NodeMailer transporter
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Marwantest70@gmail.com',
    pass: 'zech uxtr bhsu zbec'
  }
});

exports.sendNotifications = async (req, res) => {
  try {
    // Get the latest notification
    const lastNotification = await Notification.findOne().sort({ time: -1 });
    if (!lastNotification) {
      res.status(404).send('No notifications found');
      return;
    }

    // Get all pharmacists' emails
    const pharmacists = await Pharmacist.find({});
    const emails = pharmacists.map(pharmacist => pharmacist.email);

    // Send email to each pharmacist
    emails.forEach(email => {
      const mailOptions = {
        from: 'Marwantest70@gmail.com',
        to: email,
        subject: "OOPS",
        text: lastNotification.content
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error sending email to:', email, error);
        } else {
          console.log('Email sent to:', email);
        }
      });
    });

    res.send('Notifications sent successfully');
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('Error sending notifications');
  }
};

//module.exports = { sendNotifications };



  // i want to get the last notification in the notification schema and send it to all pharmacist's email using node mailer i already have a mail that i created for test purposes here it is
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'Marwantest70@gmail.com',
  //     pass: 'zech uxtr bhsu zbec'
  //   }
  // });
  // here is the notifications schema imported as const Notification = require('../Models/notifications');
//   const mongoose = require('mongoose');

// const NotificationSchema = new mongoose.Schema({
//   receiver: {
//     type: String,
//     required: true,
//     enum: ['Doctor', 'Patient', 'Pharm']
//   },
//   time: {
//     type: Date,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     enum: ['Confirmed', 'Cancelled', 'Rescheduled']
//   },
  
// });

// module.exports = mongoose.model('Notification', NotificationSchema);
  //   here is the pharmacists.js schema imported as const pharmacists = require('../Models/pharmacists');
//   const mongoose = require('mongoose');
// const User = require('../Models/User'); // Import User model and schema

// const PharmacistSchema = new mongoose.Schema();
// PharmacistSchema.add(User.UserSchema); // Adding UserSchema to PharmacistSchema
// PharmacistSchema.add({
//   role: { 
//     type: String,
//     default: 'pharmacist',
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   dateOfBirth: {
//     type: String,
//     required: true,
//   },
//   hourlyRate: {
//     type: Number,
//     required: true,
//   },
//   affiliation: {
//     type: String,
//     required: true,
//   },
//   educationalBackground: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('Pharmacist', PharmacistSchema);





  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // exports.lastappod = async (req, res) => {
  //   try {
  //     const patientId = req.params.id;
  //     // Ensure the patient exists
  //     const patientExists = await patients.findById(patientId);
  //     if (!patientExists) {
  //       return res.status(404).json({ message: 'Patient not found' });
  //     }
  
  //     // Find the most recent appointment for this patient, sorted by appointment ID
  //     const lastAppointment = await appointement.findOne({ patient: patientId })
  //       .sort({ _id: -1 })
  //       .populate('doctor');
  
  //     if (!lastAppointment) {
  //       return res.status(404).json({ message: 'No appointments found for this patient' });
  //     }
  
  //     res.status(200).json(lastAppointment);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // };