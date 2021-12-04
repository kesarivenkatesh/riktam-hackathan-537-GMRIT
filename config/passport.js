const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// Load Models
const User = require('../models/User');

// Load Keys
const JWT_KEY = process.env.JWT_KEY;


// Passport Config
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_KEY;


// Passport Strategy
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload.role === 1) {
            // TODO: Write Code for Admin
        } else if (jwt_payload.role === 0) {
            User.findOne({ email: jwt_payload.email })
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.error(err));
        } else {
            return done(null, false);
        }
    }));
}