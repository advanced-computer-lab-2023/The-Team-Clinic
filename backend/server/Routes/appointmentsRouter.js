const express = require('express');
const router = express.Router();
const appoincontroller = require('../Controllers/appointmentController');
const Notification = require('../Models/notifications'); 

router.post('/', appoincontroller.createAppointment);
router.get('/available-appointments', appoincontroller.getAvailableAppointments);
router.get('/upcoming-appointments/:id', appoincontroller.getUpcomingAppointments);
router.get('/patient/:id', appoincontroller.getallappointementsPatient);
router.get('/confirmation/:id', appoincontroller.confirmation);  
router.get('/doctor/:id', appoincontroller.getallappointementsDoctor);    
router.put('/:id', appoincontroller.updateappointements);
router.delete('/:id', appoincontroller.deleteappointement);
router.post('/create-upcoming-appointment', appoincontroller.createUpcomingAppointment);
//router.get('/notifications/:id', appoincontroller.getallappointementsPatient);

//router.post('/create-notification',appoincontroller.createNotification);

router.get('/patient-notifications/:id', async (req, res) => {
    try {
      const patientId = req.params.id;
  
      // Find all notifications where the receiver is the specified patient ID
      const patientNotifications = await Notification.find({ receiver: patientId });
  
      res.status(200).json(patientNotifications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;