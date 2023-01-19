
const jwt = require('jsonwebtoken')

//Middleware to authenticate any received token
function generateAccessToken(user){
    
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1200s'}) // Access token will be active for 20 mins

}

module.exports = {
generateAccessToken,
}