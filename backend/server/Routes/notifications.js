const express = require('express');
const router = express.Router();
const notifcontroller = require('../Controllers/notifController');
const appoincontroller = require('../Controllers/appointmentController');

//router.get('/confirmation/:id', notifcontroller.lastappop);
//router.get('/notifications/:id/lastAppointmentAndNotify', notifcontroller.lastAppointmentAndNotify);
router.get('/checkAppointments/:id', notifcontroller.checkAppointmentsAndNotify);
//router.get('/notifications/:id', appoincontroller.getallappointementsPatient);
module.exports = router;