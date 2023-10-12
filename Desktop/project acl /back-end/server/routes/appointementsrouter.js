const express=require('express');
const router=express.Router();
const appoincontroller=require('../controllers/appoincontroller')

router.post('/',appoincontroller.createappointement);

router.get('/',appoincontroller.getallappointements);


router.put('/:id',appoincontroller.updateappointements);


router.delete('/:id',appoincontroller.deleteappointement);
module.exports=router;

