const express = require('express');
const authrouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/Auth');

authrouter.post('/login',function(req, res, next){

    console.log("I am able to Hit the Auth Token post request");
    
    var username  = req.body.username;
    var password = req.body.password;

    User.find({username,password}).then(function(authoriseduser){
        
        console.log("\n"+"Authorised User Credentials"+"\n"+authoriseduser);
        console.log("Authorised User"+JSON.stringify(authoriseduser));
        

        const user = {
            username,
            password
        };
        
        console.log("\n"+"User being verified is = "+"\n"+JSON.stringify(user));
        

        jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, access_token)=>{
            
            res.send({
                access_token,
            });
        }); // Using catch(next) here will try to re-set the header after sending it.
    
    }).catch(next);

    
});

module.exports = authrouter;