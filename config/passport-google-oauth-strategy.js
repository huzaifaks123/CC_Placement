// import passport from modules
const passport = require('passport')

// import googleOauthStrategy from modules
const googleStrategy = require('passport-google-oauth').OAuth2Strategy

// import cypto from crypto
const crypto = require('crypto')

// import User from user model
const User = require('../models/user_model')

// create google auth stratgey using google dev
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ email: profile.emails[0].value })
        if (user) {
            return done(null, user)
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })
                .then(user => {
                    return done(null, user)
                })
                .catch(err => {
                    console.log("Error while creating user google strategy passport :", err)
                    return
                })
        }
    }
))
