// import passport from modules
const passport = require('passport')
// import JWTStrategy from modules
const JwtStrategy = require('passport-jwt').Strategy;
// Extract JWTStrategy from modules
const ExtractJwt = require('passport-jwt').ExtractJwt;

// import User from user model
const User = require('../models/user_model');

// create jwtOptions
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

// use jwtStrategy to verify token
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload._id)
    console.log("inside findingUser")
        .then(user => {
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => {
            console.log("inside error")
            return done(err, false)
        })
}))

// export module
module.exports = passport;