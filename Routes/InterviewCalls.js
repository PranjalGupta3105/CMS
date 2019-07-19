const express = require('express');
const router = express.Router();

router.post('/RegisterNewInterview',function(req,res){
        console.log("I have Entered Register New Interview API");
        var sampleresponsebody = JSON.stringify(
            {
                "Registered Company":"XYZ Corporation Pvt Ltd",
                "Interview Date":"22-07-19",
                "Message": "Interview Details Saved Successfully"
            }
            );

        res.send(sampleresponsebody);
    });


router.get('/ScheduledInterviews',function(req, res){
        console.log("I am Inside the Get All Scheduled Interviews");
        var sampleresponsebody = JSON.stringify(
            {
                "Company Name": "XYZ Corporation Pvt Ltd",
                "Interview Date": "12-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India",
            },
            {
                "Company Name": "XYZ Corporation Pvt Ltd 2",
                "Interview Date": "13-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India",
            },
            {
                "Company Name": "XYZ Corporation Pvt Ltd 3",
                "Interview Date": "14-07-19",
                "Interview Venue": "ABC Cyber Park Near PQR Cyber City UWZ City India"
            }
        );

        res.send(sampleresponsebody); 
    });


router.get('/ScheduledInterviews/:interviewdate',function(req, res){
        console.log("I am Inside the Get All Scheduled Interviews By Date");
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