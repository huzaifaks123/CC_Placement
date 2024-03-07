const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user_model');

console.log("inside JWT")
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "CC_Placement"
}


passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload._id)
    console.log("inside findingUser")
    .then(user => {
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    })
    .catch(err => {
        console.log("inside error")
        return done(err, false)
    })
}))


// passport.use(new JwtStrategy(opts, async function(jwtPayload, done) {
//     try {
//         const user = await User.findById(jwtPayload._id);
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     } catch (error) {
//         return done(error, false);
//     }
// }));

module.exports = passport;