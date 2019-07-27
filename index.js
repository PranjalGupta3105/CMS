const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var config = require('./config.json');

// Setting up the Express App
const app = express();

// Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response.
app.use(cors());
app.options('*', cors());
// https://stackoverflow.com/questions/42061727/cors-error-request-header-field-authorization-is-not-allowed-by-access-control

app.get('/', function(req, res){
    res.send('Services Connected');
});


// Connect to MongoDB
if(config.Environment == "Test")
{

//  Local DB Connection Configurations
var dbconnectionURL  = `localhost`;
config.Database = `InterviewsDB`;

mongoose.connect(`mongodb://${dbconnectionURL}/${config.Database}`);

mongoose.Promise = global.Promise;
console.log("Connection Established For Test Env");
}
else
{
// Cloud Deployed DB Connection Configurations 
// Beware :- Update config.json before cloud deployment of services
var dbconnectionURL  = `${config.User}:${encodeURIComponent(config.Password)}@${config.Host}:${config.Port}`;

mongoose.connect(`mongodb://${dbconnectionURL}/${config.Database}`);
// Had Problem with using @ in the Password of MongoDB solved using Answer Provided by vanduc1102
// at : https://stackoverflow.com/questions/7486623/mongodb-password-with-in-it

mongoose.Promise = global.Promise;
console.log("Connection Established For Dev Env");
}

// Get Access Token
const authtokenRoute = require('./Routes/auth');


// Grabbing up all of the Routes defined in the file
const interviewbasedOperationsRoute = require('./Routes/InterviewCalls');


// Role : It is a Middle-ware, takes the Body as send by the Caller and attaches it to the Request's Body for further usage
app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api',authtokenRoute);

app.use('/api',interviewbasedOperationsRoute);

// Custom Error Handling Middleware
app.use(function(err, req, res, next){

    console.log("\n"+"Request Failed"+"\n");
    res.status(422).send({
        "Message": err.message
    });
});

// Listen to the Requests
app.listen(process.env.PORT || 4000, function()
{ 
    console.log("Ready to Listen the Requests");   
});

