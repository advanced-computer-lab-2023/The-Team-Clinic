const express = require('express');
const router = express.Router();
const appoincontroller = require('../Controllers/appointmentController');
//const Notification = require('../Models/notifications'); 

router.post('/', appoincontroller.createAppointment);
router.get('/available-appointments', appoincontroller.getAvailableAppointments);
router.get('/upcoming-appointments/:id', appoincontroller.getUpcomingAppointments);
router.get('/patient/:id', appoincontroller.getallappointementsPatient);
router.get('/confirmation/:id', appoincontroller.confirmation);  
router.get('/doctor/:id', appoincontroller.getallappointementsDoctor);    
router.put('/:id', appoincontroller.updateappointements);
router.delete('/:id', appoincontroller.deleteappointement);
router.post('/create-upcoming-appointment', appoincontroller.createUpcomingAppointment);
router.post('/lastAppointment', appoincontroller.getlastappointement);
router.get('/receiver/:receiverId', appoincontroller.getNotificationsByReceiver);
module.exports = router;