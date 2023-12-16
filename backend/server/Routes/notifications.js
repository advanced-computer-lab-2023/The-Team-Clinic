const express = require('express');
const router = express.Router();
const notifcontroller = require('../Controllers/notifControllers');

router.get('/',notifcontroller.getPharmNotifications);
router.put('/',notifcontroller.addNotificationPharm);
router.get('/send-notifications', notifcontroller.sendNotifications);
module.exports = router;