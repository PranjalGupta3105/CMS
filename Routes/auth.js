const express = require('express');
const authrouter = express.Router();
const jwt = require('jsonwebtoken');

authrouter.post('/login',function(req, res, next){

    console.log("I am able to Hit the Auth Token post request");
    
    const user = {
        username: 'pranjal',
        password: 'adminadmin'
    };

    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, access_token)=>{
        res.send({
            access_token: access_token
        })
    });

});

module.exports = authrouter;