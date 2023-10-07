const express = require('express');
const mongoose = require('mongoose');
const appointementroutes= require('./routes/appointementsrouter');



const app= express();
app.use(express.json());



app.use('/appooins',appointementroutes);

const connectionString="mongodb+srv://TheTeam:AclProj@aclpharmdb.ukxxvcp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology: true,



});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));
db.once('open',()=> {
    console.log('Connected to MongoDB');

});


const PORT=2003;

app.listen(PORT,() => {
    console.log('Server is running on port ${PORT} ');
});



