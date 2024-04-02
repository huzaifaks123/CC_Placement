// import environment variable
require('dotenv').config()

// import express from express-module
const express = require('express');
// import cookieParser from module
const cookieParser = require('cookie-parser')
// create express instance
const app = express();
// declare port variable
const port = process.env.PORT;
// import expressEjsLayouts from express-module
const expressLayouts = require('express-ejs-layouts')
// import db from its directory
const db = require('./config/mongoose')
// import excelJs from excel modules
const excelJs = require('exceljs')
// import passport from passport modules for its usage;
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth-strategy')
// import session from express-module
const session = require('express-session');
const MongoStore = require('connect-mongo');
// import defined middlewares
const sassMiddelware = require('node-sass-middleware');

// use sass to impplement style
app.use(sassMiddelware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

// use express.static to define static folders
app.use(express.static('./assets'))

// use ejsLayout in the midddleWare
app.use(expressLayouts)

// use urlencoded in the midddleWare to read urlData
app.use(express.urlencoded({ extended: true }));

// use cookieParser in the midddleWare to allow cookie access 
app.use(cookieParser());

// set ejs view engine as view
app.set('view engine', 'ejs');
app.set('views', './views');

// set layout to extrct styles and js to place at defined position in ejs
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use session middleware to create session
app.use(session({
    name: "CC_Placement",
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10 * 10000 * 60)
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        autoRemove: 'disabled'
    }),
    function(err) {
        console.log(err || 'connect-mongo setup ok')
    }
}))

// use passport session to create session
app.use(passport.initialize());
app.use(passport.session());

// use 
app.use('/', require('./routes'));

// define listen to run server on port
app.listen(port, function (err) {
    if (err) {
        console.log("Error while running server : ", err);
        return
    }
    console.log("Server is running successfully on port : ", port);
})

