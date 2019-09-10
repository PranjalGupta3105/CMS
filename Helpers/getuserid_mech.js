const User = require('../Models/User');


module.exports.getUserIdFromToken = function(authdata, deliveruserId)
{

    console.log("Auth Data "+JSON.stringify(authdata));

    var loginuserdetails = JSON.stringify(JSON.parse(JSON.stringify(authdata))['user']);
    var loginusername = JSON.parse(loginuserdetails)['username'];

    console.log("Login User Username = "+loginusername);
    
    User.find({Username: loginusername}).then(function(loggedusercredentials){
                
        console.log("stringyfied value"+JSON.stringify(loggedusercredentials));
        
         console.log("parsed value"+JSON.parse(JSON.stringify(loggedusercredentials)));

         var userid = JSON.stringify(JSON.parse(JSON.stringify(loggedusercredentials))[0]['_id']);
         console.log("Logged User Id is "+userid);
        
        // var userid  = "5d448f7659634e2678b2df3d" ;

        deliveruserId(userid);
    
    });
}

