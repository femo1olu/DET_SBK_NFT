const jwt = require('jsonwebtoken');
require('dotenv').config();
//const User = require('../models/Users.model');


const verifySessionId = (req, res, next) => {
    const sessionToken = req.session.sessionToken;

    console.log('This is the cookie token sent by the Browser: ' + req.cookies.cookieToken); // Bearer token
    console.log('This is the access/Session token sent by the Browser: ' + sessionToken); // Bearer token
    //if ((!authZToken) || (authZToken == null)) return res.render('protected_views/signin', {msg: ' '}) //res.sendStatus(401)

    jwt.verify(
        sessionToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {        
            if (err) return res.render('/', {msg: 'Not Authorized...'})//console.log('Token resolution issue 2 in verifyParam') //res.redirect('/authenServer/Login') //res.sendStatus(403); //invalid token
            req.email = decoded.email;
            console.log('This is the email decoded from the access token sent by the Browser: ' + req.email);
                 
           next()   // this enables the toggling of the Nav Bars
        }
    )

}

module.exports = { 
    verifySessionId,
}