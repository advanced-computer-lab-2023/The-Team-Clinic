const mongoose= require('mongoose');
const Notification = require('../Models/notifications');
const appointement = require('../Models/appointements');
const patients = require('../Models/patients');
//const doctors = require('../Models/doctors');



exports.lastappop = async (req, res) => {
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

 

exports.lastAppointmentAndNotify = async (req, res) => {
  try {
    const patientId = req.params.id;
    // Ensure the patient exists
    const patientExists = await patients.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find the most recent appointment for this patient
    const lastAppointment = await appointement.findOne({ patient: patientId })
      .sort({ _id: -1 })
      .populate('doctor');

    if (!lastAppointment) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    // Create and save a notification
    const newNotification = new Notification({
      receiver: patientId, // Assuming the receiver is the patient
      time: new Date(), // Current time as the notification time
      content: `Your last appointment details: Doctor - ${lastAppointment.doctor.fullName}, Date - ${lastAppointment.date}`,
      title: 'Confirmed' // Since you mentioned you want to save it as 'Confirmed'
    });

    await newNotification.save();

    // Respond with the last appointment details
    res.status(200).json(lastAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
};

  
  
  
  //const Notification = require('./path_to_notification_model'); // Import your Notification model

exports.checkAppointmentsAndNotify = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patientAppointments = await appointement.find({ patient: patientId }).populate('doctor');

    // For each appointment, create a notification
    for (const appointment of patientAppointments) {
      const newNotification = new Notification({
        receiver: patientId, // Assuming you want to notify the patient
        time: new Date(), // Current time as the notification time
        content: `You have an appointment with ${appointment.doctor.name} on ${appointment.date}`, // Customize this message as needed
        title: 'Confirmed', // Or use a relevant title from your enum
      });

      // Save the notification to the database
      await newNotification.save();
    }

    res.status(200).json({ message: 'Notifications created for appointments' });
  } catch (err) {
    res.status(500).json(err);
  }
};

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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