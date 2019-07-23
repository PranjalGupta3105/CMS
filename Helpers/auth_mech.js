module.exports.verifyToken = function (req, res, next){

    // Get auth Header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space 
        const bearer = bearerHeader.split(' ');
        // Get Token from the array
        const bearerToken = bearer[1];
        // Set the Token
        req.token = bearerToken;
        // Next Middleware
        next();
    }
    else
    {
        res.sendStatus(403);
    }
};