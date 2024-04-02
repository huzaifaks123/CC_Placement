// import passport from modules
const passport = require('passport')
// import localStrategy from modules
const localStrategy = require('passport-local').Strategy

// import User from user model
const User = require('../models/user_model')

// use localStrategy to create and verify token
passport.use(new localStrategy({
    usernameField : 'email',
    passReqToCallback : true
},
function (req, email, password, done) {
    User.findOne({email : email})
    .then(user => {
        if(!user || user.password != password){
            console.log("invalid username/password");
            return done(null, false)
        }else{
            return done(null, user)
        }
    })
    .catch(err => {
        return done(err)
    })

}
))


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    await User.findById(id)
    .then(user => {
        return done(null, user)
    })
    .catch(err => {
        console.log("error in finding user inside deserializeUser")
    })
}) 

passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
}

passport.setAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        res.local.user = req.user
    }
    next()
}

module.exports = passport