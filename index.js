const express = require('express');

// Setting up the Express App
const app = express();

//
const interviewbasedOperationsRoute = require('./Routes/InterviewCalls');

app.use('/api',interviewbasedOperationsRoute);

// Listen to the Requests
app.listen(process.env.port || 4000, function(){  // Add ( process.event.port || ) before 4000 before deploying the app to Heroku
    console.log("Ready to Listen the Requests");   
});

