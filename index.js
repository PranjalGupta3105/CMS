const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var config = require('./config.json');

// Setting up the Express App
const app = express();

app.get('/', function(req, res){
    res.send('Connected');
});

// Grabbing up all of the Routes defined in the file
const interviewbasedOperationsRoute = require('./Routes/InterviewCalls');

// Connect to MongoDB

// mongoose.connect('mongodb://localhost/InterviewsDB');
mongoose.connect(`mongodb://${config.User}:${encodeURIComponent(config.Password)}@ds253537.mlab.com:53537/heroku_l7rc1lfr`);
// Had Problem with using @ in the Password of MongoDB solved using Answer Provided by vanduc1102
// at : https://stackoverflow.com/questions/7486623/mongodb-password-with-in-it

mongoose.Promise = global.Promise;


// Role : It is a Middle-ware, takes the Body as send by the Caller and attaches it to the Request's Body for further usage
app.use(bodyparser.json());

app.use('/api',interviewbasedOperationsRoute);

// Custom Error Handling Middleware
app.use(function(err, req, res, next){

    console.log("\n"+"Request Failed"+"\n");
    res.status(422).send({
        "Message": err.message
    });
});

// Listen to the Requests
app.listen(process.env.PORT || 4000, function(){  // Add ( process.event.port || ) before 4000 before deploying the app to Heroku
    console.log("Ready to Listen the Requests");   
});

