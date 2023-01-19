if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}
//import Required Packages
const express = require('express');
const app = express();

const dotenv = require('dotenv');
var path = require('path');

const session = require("express-session") // For session management

const cookieParser = require("cookie-parser")

const publicDirectory = path.join(__dirname, 'public');


//

    // Initialize path to routes
const routes = require('./routes/index'); //paths through index.js


app.use(cookieParser()) // Allow the use of cookie, globally

// Creating a global variable
app.use(
  session({ //This allow the generation of session ID globally. It is called in auth.controller.js line 45
    // You could actually store your secret in your .env file - but to keep this example as simple as possible...
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
  })
)
//app.use(csrf()) // applies middleware for CSRF protection globally

dotenv.config();




//False indicates we are not sending forms... Actually, it indicates we can grab data from forms
//Parse URL encoded bodies.
app.use(express.urlencoded({extended: false}));

//app.use(cookieParser())
//so we can send the traffic in json format.//Parse JSON encoded bodies
app.use(express.json({limit: '1mb'}));


// Set Static Folder path configuration, where static files (css, img etc) will be served from
  //app.use(express.static('../client')); // e.g. home for all .htmls
app.use(express.static(publicDirectory));

// Set View Engine --- // the repo for my private files routes maps on top of it.
app.set('view engine', 'ejs'); // Specifies views directory as location of pages to render

 //Input (Request string) to route directory mapping
app.use('/', routes);



//Launch server by getting the PORT from .env
app.listen(process.env.PORT, () => { 
  console.log(`Server started on port ${process.env.PORT}`)
});
