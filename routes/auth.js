const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Load Models
const User = require('../models/User');

// Load Keys
const JWT_KEY = process.env.JWT_KEY;

// Load Validations
const { signupValidation, loginValidation } = require('../validations/auth');



// @route   :: POST /api/signup
// @desc    :: Register a new user
// @access  :: Public
router.post(
    '/signup',
    signupValidation,
    (req, res) => {
        // Check if user already exists
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ err: 'User already exists' });
                } else {
                    // Create new user
                    const newUser = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password,
                        contact_number: req.body.contact_number,
                        karma_points: 100,
                    });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => res.status(400).json({ err: 'User not created' }));
                        });
                    });
                }
            })
            .catch(err => res.status(400).json({ err: 'User not created' }));
    }
)

// @route   :: POST /api/login
// @desc    :: User Login
// @access  :: Public

router.post(
    '/login',
    loginValidation,
    (req, res) => {
        // Check whether user exists or not
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    // Check password
                    bcrypt.compare(req.body.password, user.password)
                        .then(isMatch => {
                            if (isMatch) {
                                // User Matched
                                const payload = {
                                    id: user._id,
                                    email: user.email,
                                    role: user.role,
                                    karma_points: user.karma_points,
                                    firstname: user.firstname,
                                    lastname: user.lastname
                                };
                                // Sign Token
                                jwt.sign(
                                    payload,
                                    JWT_KEY,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        })
                                    }
                                );
                            } else {
                                return res.status(400).json({ password: 'Password incorrect' });
                            }
                        })
                } else {
                    return res.status(400).json({ email: 'User does not exist' });
                }
            })
    }
)


// @route   :: GET /api/current
// @desc    :: Return current user
// @access  :: Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ email: req.user.email })
            .then(user => {
                return res.json(user);
            })
    }
)


module.exports = router;