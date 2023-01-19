//Load in all environment variables
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config(); // needed to allow non-app.js files to find .env
  }
  //import Required Packages
  var express = require('express');
  var router = express.Router();
  const bodyParser = require('body-parser');

  var {check, validationResult} = require('express-validator');

  const bcrypt = require('bcryptjs');

  const users = require('../data/users.json')
  const fs = require('fs')
  router.use(bodyParser.json());
  const urlencodedParser = bodyParser.urlencoded({extended: false});
  
const {
verifySessionId,
} = require('../middleware/verifySessionId');

const {
    generateAccessToken,
    } = require('../middleware/tokenGenerator');

const jwt = require('jsonwebtoken')

const NFT_Collection = require('../data/collection.json')
console.log('This is the content of the collection ', JSON.stringify(NFT_Collection))
const data = JSON.stringify(NFT_Collection)


  //Input to Directory route chosen to specific file mapping
  //Add route -- This is route for home/index page
  router.get('/', function(req, res){
   // Landing page is served from Client index.html instead of index.ejs
   //console.log('almost there')
   res.render('home', {msg: " " });
  });
  
  router.post('/signup', [check('email', 'invalid email address').isEmail().normalizeEmail(),
  check('password', 'Invalid password').exists().isLength({min:6 })],
  function(req, response){
  let usercredentials = req.body;
  console.log('Username and Password Entered  for signup', usercredentials);
 
 const errors = validationResult(req);
  console.log(errors);
  if(!errors.isEmpty()){
    response.render('home', {msg: 'Invalid Entry'});
    console.log('VALIDATION PRODUCED AND ERROR @ SIGNUP...Not good...')
  }else{
  
  console.log('This is the 1st check of the Cookie content at signup: ', req.cookies.cookieToken)
     const newuser = req.body;
     console.log('Username and Password for signup ', newuser);

     bcrypt.genSalt().then(salt => {
        bcrypt.hash(newuser.password, salt, function(err, hash){
        console.log(hash);
        console.log(salt);
        newuser.password = hash;

        console.log (newuser.password)

    })})
//  Hash e-mail too
    bcrypt.genSalt().then(salt => {
        bcrypt.hash(newuser.email, salt, function(err, hash){
        console.log(hash);
        console.log(salt);
        newuser.email = hash;

        console.log (newuser.email)



        fs.writeFile("/home/femi-fawe/Desktop/EY/OffDChain/data/users.json", JSON.stringify(newuser), (err) =>{ // flag set to avoid over writting
            if(err){
                console.log('Unable to signup user')
            }else{
                console.log('Done writing to users.json file....')
            }
        })


    })})
    response.render('home', {msg: 'User Added!'});
 } 
});


 router.post('/login', [check('email', 'invalid email address').isEmail().normalizeEmail(),
 check('password', 'Invalid password').exists().isLength({min:6 })],
 function(req, response){
 let usercredentials = req.body;
 console.log('Username and Password Entered ', usercredentials);

const errors = validationResult(req);
 console.log(errors);
 if(!errors.isEmpty()){
   response.render('home',{msg: 'Invalid Credentials'});
   console.log('VALIDATION PRODUCED AND ERROR...Not good...')
 }else{
 
 console.log('This is the 1st check of the Cookie content at login: ', req.cookies.cookieToken)
 

    let accessToken = null
    let refreshToken = null 
    let validEmail = null

    const usercredentials = req.body;
    console.log('Username and Password seen ', usercredentials);
    console.log('Username and Password seen as hash ', users);
  console.log('Length/count of json object ', Object.keys(users).length) // Get length of JSON Object

        bcrypt.compare(usercredentials.email, users.email , function(err, res) {
        if(res){
            validEmail = true
        }
        else{
            validEmail = false
        }
        })
                bcrypt.compare(usercredentials.password, users.password , function(err, res) {
                if((res)&&(validEmail == true)){
                    console.log(users.password);
                    console.log(usercredentials.password);


                    accessToken = generateAccessToken({email: users.email}) // to create a webtoken. Pass user into the function for generation
                    refreshToken = jwt.sign( {email: users.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})                                    
                    req.session.sessionToken = accessToken   // Gives Session ID
                    
                    
                    response
                    .status(201)
                    .header({ 'authorization': [ `Bearer ${accessToken}` ]} )
                    //JWT Refresh Token in Cookie
                    .cookie('jwtRefresh', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, max_Age: 3600} )
 
                    .cookie('cookieToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true, max_Age: 500} )

                    .render('landingpage', {data: data}); 

                    console.log('This is the access token granted by handleLogin: ' + accessToken)
                } 
                else{
                    response
                    .status(401)                          
                    //.json(null)
                    .render('home', {msg: 'Invalid Credentials'}); 
                    console.log('No access token granted')  
                    }
                });
}
})
  
 router.get('/logout', verifySessionId, (req, res) => { // Delete Refresh token from DB. Once logout is hit compare current refresh token to the very first one issued
   // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    //res.sendStatus(204) // Say No Content
    //console.log('Access token sent to LogOut: ' + req.query.accessToken)
    console.log('reb body sent to LogOut: ' + req.body)
    let accessToken = null

  })
  

 
 //make accessible to other files
 module.exports = router; 
 
  
  