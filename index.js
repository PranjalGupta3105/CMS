const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// Setting up the Express App
const app = express();

// Grabbing up all of the Routes defined in the file
const interviewbasedOperationsRoute = require('./Routes/InterviewCalls');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/InterviewsDB');
mongoose.Promise = global.Promise;


// Role : It is a Middle-ware, takes the Body as send by the Caller and attaches it to the Request's Body for further usage
app.use(bodyparser.json());

app.use('/api',interviewbasedOperationsRoute);

// Listen to the Requests
app.listen(process.env.port || 4000, function(){  // Add ( process.event.port || ) before 4000 before deploying the app to Heroku
    console.log("Ready to Listen the Requests");   
});

