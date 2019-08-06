const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Interview = require('../Models/Interview');
const tokenAuth = require('../Helpers/auth_mech');
const userIdHelper = require('../Helpers/getuserid_mech');

// ---------------------------- New User Sign Up
router.post('/SignUp', function(req, res, next)
{ 
    
    console.log("API Invoked Sign up");
    
    User.create(req.body).then(function(signupresponse)
    {
        var userSignUpResponse = JSON.stringify(
        {
            "Message": "Your Signed-In Successfully",
            "UserId": signupresponse._id
        });

        res.send(userSignUpResponse);

    }).catch(next);
});


// ---------------------------- Register a New Interview
router.post('/RegisterNewInterview', tokenAuth.verifyToken, function(req, res, next){
        
    jwt.verify(req.token, 'secretkey', (err, authData)=>
    {
        if(err){
            res.sendStatus(403);
        }
        else
        {
            userIdHelper.getUserIdFromToken(authData, function(userid)
            {
                
                console.log("User Id = "+userid);
    
                    if(userid != null)
                    {
    
                        console.log("API Invoked Register New Interview");

                        req.body.User_Id = userid.substring(1,userid.length-1);                        
    
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
                    } 
            });


        }
    });
    
});

// ---------------------------- Update an existing Interview Details
router.put('/UpdateInterviewDetails/:InterviewId', tokenAuth.verifyToken, function(req, res, next){
        
    jwt.verify(req.token, 'secretkey', (err, authData)=>
    {
        if(err){
            res.sendStatus(403);
        }
        else
        {
            userIdHelper.getUserIdFromToken(authData, function(userid)
            {
            
                console.log("User Id = "+userid);

                if(userid != null)
                {

                    console.log("API Invoked Update Interview Details");

                    var interviewId = req.params.InterviewId;

                    Interview.findByIdAndUpdate({User_Id: userid.substring(1,userid.length-1),_id: interviewId}, req.body).then(function()
                    {
                    
                        // If we return the updatedInterview, then the Enteries would not be shown reflected, thus
                        Interview.findOne({User_Id: userid.substring(1,userid.length-1),_id: interviewId}).then(function(updatedInterview)
                        {

                            var updateInterviewResponse = JSON.stringify(
                                {
                                    "Interview Id": updatedInterview._id,
                                    "Company": updatedInterview.Company,
                                    "Message": "Interview Details Updated Succcessfully"
                                });

                            res.send(updateInterviewResponse);

                        }).catch(next);

                    }).catch(next);
                
                }
            });

        }
    
    });
});

// ---------------------------- Remove an existing Interview Details
router.delete('/RemoveSavedInterview/:InterviewId', tokenAuth.verifyToken, function(req, res, next){
        
    jwt.verify(req.token, 'secretkey', (err, authData)=>
    {
        if(err){
            res.sendStatus(403);
        }
        else
        {
            userIdHelper.getUserIdFromToken(authData, function(userid)
            {
                console.log("User Id = "+userid);
                
                if(userid != null)
                {

                    console.log("API Invoked Remove a Saved Interview API");

                    // Grabbing the InterviewId for the Interview to be delete from the parameters in the URL
                    var interviewId = req.params.InterviewId; 

                    // Method will Find the Element with the Unique Object ID in Mongo DB and will remove it
                    Interview.findByIdAndRemove({User_Id: userid.substring(1,userid.length-1),_id: interviewId}).then(function(removedinterview){
                    
                    var deleteInterviewResponse = JSON.stringify(
                        {
                            "Interview Id":removedinterview._id,
                            "Message":"Interview Details Removed Successfully"
                        });
                    
                    res.send(deleteInterviewResponse);
                    }).catch(next);
                
                }

            });
        
        }
    });

});

// ---------------------------- Returns all of the Interviews Scheduled Sorted By Date
router.get('/ScheduledInterviews', tokenAuth.verifyToken, function(req, res, next){
        
        jwt.verify(req.token, 'secretkey', (err, authData)=>
        {
            if(err)
            {
                res.sendStatus(403);
            }
            else
            {
                userIdHelper.getUserIdFromToken(authData, function(userid)
                {
                    console.log("User Id = "+userid);

                    if(userid != null)
                    {

                        console.log("API Invoked Get All Scheduled Interviews");

                        console.log({User_Id: userid.substring(1, userid.length-1)});

                        Interview.find({User_Id: userid.substring(1, userid.length-1)}).sort({Interview_Date: -1}).then(function(interviews){
                        
                        // Returning Interviews Sorted in Descending Order of the Interview Date
                        res.send({ interviews, authData }); 
                        
                        }).catch(next);
                    
                    }
                });

            }
        });
        
    });

// ---------------------------- Returns all of the Interviews Scheduled for a Particular Date
router.get('/ScheduledInterviews/:InterviewDate', tokenAuth.verifyToken, function(req, res, next){
        
    jwt.verify(req.token, 'secretkey', (err, authData)=>
    {
            
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            userIdHelper.getUserIdFromToken(authData, function(userid)
            {
            
                console.log("User Id = "+userid);
                if(userid != null)
                {
                    console.log("API Invoked = Get All Scheduled Interviews By Date");

                    var interviewDate = req.params.InterviewDate;

                    Interview.find({User_Id: userid.substring(1,userid.length-1),Interview_Date: interviewDate}).then(function(interviewsondate){
                    
                    res.send(interviewsondate); 

                    }).catch(next);

                }

            });
        }
    });

});


// ---------------------------- Returns the Interviews by InterviewId
router.get('/GetInterview/:InterviewId', tokenAuth.verifyToken, function(req, res, next){
        
    jwt.verify(req.token, 'secretkey', (err, authData)=>
    {
        if(err)
        {
        res.sendStatus(403);
        }
        else
        {
            userIdHelper.getUserIdFromToken(authData, function(userid)
            {
                console.log("User Id = "+userid);

                if(userid != null)
                {
                    console.log("API Invoked = Get Interviews By Id");

                    //var id = req.params.InterviewId;

                    Interview.find({User_Id: userid.substring(1,userid.length-1)}).findById(req.params.InterviewId).then(function(interview){
                    
                    res.send(interview); 

                    }).catch(next);
                }
            });

        }
    });

});





module.exports = router;