const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const excelJs = require('exceljs')

const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth-strategy')
const session = require('express-session');

const MongoStore = require('connect-mongo');
const sassMiddelware = require('node-sass-middleware');

app.use(sassMiddelware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))

app.use(express.static('./assets'))


app.use(expressLayouts)

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
    name : "CC_Placement",
    secret : "random",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge :  (10 * 10000 * 60)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost/CC_placement',
        autoRemove : 'disabled'
    }),
    function(err){
        console.log(err || 'connect-mongo setup ok')
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("Error while running server : ",err);
        return 
    }
    console.log("Server is running successfully on port : ",port);
})

