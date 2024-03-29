const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user_model')

passport.use(new googleStrategy({
    clientID: CLIENTID,
    clientSecret:  CLIENTSECRET,
    callbackURL: "http://localhost:8000/user/auth/google/callback"
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
