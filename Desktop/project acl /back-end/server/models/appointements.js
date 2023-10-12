const mongoose= require('mongoose');
const appoinschema= new mongoose.Schema({
    pid:{
        type: Number,
        required:true,
    },
   did:{
        type: Number,
        required:true,
    },
    status:{
        type: String,

        required:true,
    },
    date:{
        type: Date,
        required:true,
    },
    
    
    

});
module.exports=mongoose.model('appointements',appoinschema);