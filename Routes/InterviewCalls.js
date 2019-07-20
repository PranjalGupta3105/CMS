const express = require('express');
const router = express.Router();
const Interview = require('../Models/Interview');


// ---------------------------- Register a New Interview Call
router.post('/RegisterNewInterview',function(req, res, next){
        console.log("I have Entered Register New Interview API");
        // console.log("\n"+"Request Body send to the API"+"\n");
        // console.log(req.body);
        Interview.create(req.body).then(function(interview){
            
            var registerInterviewResponse = JSON.stringify(
                {
                    "Interview Id": interview._id,
                    "Company Name": interview.Company,
                    "Interview Date": interview.Interview_Date,
                    "Message": "Interview Details Saved Successfully"
                });
    
            res.send(registerInterviewResponse);
        }).catch(next);
        
    });

// ---------------------------- Update an existing Interview Details
router.put('/UpdateInterviewDetails/:InterviewId', function(req, res, next){
        console.log("I have Entered Update Interview Details API");
        var sampleresponsebody = JSON.stringify(
            {
                "Interview Id": 1,
                "Message": "Interview Details Updated Succcessfully"
            });
        
        res.send(sampleresponsebody);
});

// ---------------------------- Remove an existing Interview Details
router.delete('/RemoveSavedInterview/:InterviewId',function(req, res, next){
        console.log("I have Entered Remove a Saved Interview API");
        var sampleresponsebody = JSON.stringify(
            {
                "Interview Id":1,
                "Message":"Interview Details Removed Successfully"
            });
        
        res.send(sampleresponsebody);
});

// ---------------------------- Returns all of the Interviews Scheduled Sorted By Date
router.get('/ScheduledInterviews',function(req, res, next){
        console.log("I am Inside the Get All Scheduled Interviews API");
        var sampleresponsebody = JSON.stringify(
            [{
                "Company Name": "XYZ Corporation Pvt Ltd",
                "Interview Date": "12-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India"
            },
            {
                "Company Name": "XYZ Corporation Pvt Ltd 2",
                "Interview Date": "13-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India"
            },
            {
                "Company Name": "XYZ Corporation Pvt Ltd 3",
                "Interview Date": "14-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India"
            }]
        );

        res.send(sampleresponsebody); 
    });

// ---------------------------- Returns all of the Interviews Scheduled for a Particular Date
router.get('/ScheduledInterviews/:InterviewDate',function(req, res, next){
        console.log("I am Inside the Get All Scheduled Interviews By Date API");
        var sampleresponsebody = JSON.stringify(
            {
                "Company Name": "XYZ Corporation Pvt Ltd",
                "Interview Date": "20-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India"
            }
        );

        res.send(sampleresponsebody); 
    });






module.exports = router;