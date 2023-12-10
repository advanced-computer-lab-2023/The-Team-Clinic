const mongoose= require('mongoose');
const appointement = require('../Models/appointements');
const patients = require('../Models/patients');
//const Notification = require('../Models/notification'); // Import the Notification model
const Notification = require('../Models/notifications');



exports.createAppointment = async (req, res) => {
  try {
    const newapp = new appointement(req.body);
    const savedapp = await newapp.save();
    res.status(201).json(savedapp);
  } catch (err) {
    res.status(500).json(err);
  }
};

async function createNotification(receiver, time, content, title) {
  try {
    const newNotification = new Notification({
      receiver,
      time,
      content,
      title
    });

    return await newNotification.save();
  } catch (err) {
    throw new Error('Error creating notification: ' + err.message);
  }
}

// exports.getallNoificationsPatient = async (req, res) => {
//   try {
//     const patientId = req.params.receiver;
//     const patientnotif = await Notification.find({ receiver: patientId })
      
//     res.status(200).json(patientnotif);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// exports.getallNoificationsPatient = async (req, res) => {
//   try {
//     const patientId = req.params.id;

//     // Find all notifications where the receiver is the specified patient ID
//     const patientNotifications = await Notification.find({ receiver: patientId });

//     res.status(200).json(patientNotifications);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getallappointementsPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patientAppointments = await appointement.find({ patient: patientId })
      .populate('doctor'); 
    res.status(200).json(patientAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.confirmation = async (req, res) => {
  try {
    const patientId = req.params.id;
    // Ensure the patient exists
    const patientExists = await patients.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find the most recent appointment for this patient, sorted by appointment ID
    const lastAppointment = await appointement.findOne({ patient: patientId })
      .sort({ _id: -1 })
      .populate('doctor');

    if (!lastAppointment) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.status(200).json(lastAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.getallappointementsDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorAppointments = await appointement.find({ doctor: doctorId })
      .populate('patient'); 
    res.status(200).json(doctorAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.updateappointements = async (req, res) => {
  try {
    const updatedapp = await appointement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedapp);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteappointement = async (req, res) => {

  try {
    await appointement.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUpcomingAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id; 
    const currentDate = new Date();

    const upcomingAppointments = await appointement
      .find({ doctor: doctorId, date: { $gte: currentDate } })
      .populate('patient')
      .select('doctor patient date');

    res.status(200).json(upcomingAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};
 

exports.getAvailableAppointments = async (req, res) => {
  try {
    const availableAppointments = await appointement.find({ status: "Available" }).populate('doctor'); ;
    res.status(200).json(availableAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUpcomingAppointment = async (req, res) => {
  try {
    const { doctor, patientName, date } = req.body;
    const patient = await patients.findOne({ fullName: patientName });
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    const newAppointment = new appointement({
      doctor: doctor,
      patient: patient._id,
      status: 'Upcoming', 
      date: new Date(date),
    });
    const savedAppointment = await newAppointment.save();
    const newNotification = new Notification({
      receiver: patient._id, // Assuming you want to notify the patient
      time: new Date(), // Current time as the notification time
      content: `You have an appointment with ${appointment.doctor.name} on ${appointment.date}`, // Customize this message as needed
      title: 'Confirmed', // Or use a relevant title from your enum
    });
    const trendNotification=await newNotification.save();


    res.status(201).json({ appointment: savedAppointment, Notification: trendNotification });

  } catch (err) {
    res.status(500).json(err);
  }
};


