const User = require('../Models/User');


module.exports.getUserIdFromToken = function(authdata, deliveruserId)
{

    console.log("Auth Data "+JSON.stringify(authdata));

    var loginuserdetails = JSON.stringify(JSON.parse(JSON.stringify(authdata))['user']);
    var loginusername = JSON.parse(loginuserdetails)['username'];

    console.log("Login User Username = "+loginusername);
    
    User.find({Username: loginusername}).then(function(loggedusercredentials){
                
    // console.log("Logged User credentials"+JSON.parse(JSON.stringify(loggedusercredentials)));

    var userid = JSON.stringify(JSON.parse(JSON.stringify(loggedusercredentials))[0]['_id']);
    console.log("Logged User Id is "+userid);
                
    deliveruserId(userid);
    
    });
}

