const mongoose= require('mongoose');
const appointement = require('../Models/appointements');
const patients = require('../Models/patients');
const Notif=require('../Models/notif');

exports.createAppointment = async (req, res) => {
  try {
    const newapp = new appointement(req.body);
    const savedapp = await newapp.save();
    res.status(201).json(savedapp);
  } catch (err) {
    res.status(500).json(err);
  }
};


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
    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getlastappointement = async (req, res) => {
  try {
    // Retrieve the patient ID from the request body
    const patientId = req.body.id;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    // Query to find the last appointment and populate both patient and doctor
    const lastPatientAppointment = await appointement.findOne({ patient: patientId })
      .sort({ date: -1 }) // Assuming 'date' is the field to sort by
      .populate('patient') // Populating patient information
      .populate('doctor'); // Populating doctor information

    // Check if an appointment was found
    if (lastPatientAppointment) {
      res.status(200).json(lastPatientAppointment);

      // Create a notification for the patient
      const patientNotif = new Notif({
        receiver: patientId,
        onModel: 'patients',
        title: 'Confirmed',
        content: {
          patientUsername: lastPatientAppointment.patient.username, // Now it should be populated
          doctorUsername: lastPatientAppointment.doctor.username,
          appointmentTime: lastPatientAppointment.date
        }
      });

      // Create a notification for the doctor
      const doctorNotif = new Notif({
        receiver: lastPatientAppointment.doctor._id,
        onModel: 'doctors',
        title: 'Confirmed',
        content: {
          patientUsername: lastPatientAppointment.patient.username, // Now it should be populated
          doctorUsername: lastPatientAppointment.doctor.username,
          appointmentTime: lastPatientAppointment.date
        }
      });

      // Save the notifications
      await patientNotif.save();
      await doctorNotif.save();

    } else {
      res.status(404).json({ message: "No appointments found for this patient" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// notificationsController.js


exports.getNotificationsByReceiver = async (req, res) => {
    try {
        const receiverId = req.params.receiverId;
        const notifications = await Notif.find({ receiver: receiverId });
        res.json(notifications);
    } catch (err) {
        res.status(500).send(err.message);
    }
};






