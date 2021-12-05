const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');


// Load Validations
const { validateRequest } = require('../validations/request');

// Load Models
const Request = require('../models/Request');
const User = require('../models/User');
const Offer = require('../models/offer');


// @route   GET api/request
// @desc    Get all requests
// @access  Public
router.get(
    '/',
    (req, res) => {
        Request.find({})
            .sort({ createdAt: -1 })
            .populate('user_id', ['firstname', 'email'])
            .then(requests => res.json(requests))
            .catch(err => res.status(404).json({ noRequestsFound: 'No requests found' }));
    }
);

// @route   GET api/request/:request_id
// @desc    Accept Others request
// @access  Private
router.get(
    '/:request_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // TODO: Check if it is our request
        const request_id = new mongoose.Types.ObjectId(req.params.request_id);
        const accepted_user_id = new mongoose.Types.ObjectId(req.user.id);


        // Fetching the request
        Request.findById(request_id)
            .then(request => {
                request.status = 'accepted';
                request.accepted_by = accepted_user_id;
                request.save()
                    .then(request => {
                        // Fetching Accepted User
                        User.findById(accepted_user_id)
                            .then(accepted_user => {
                                accepted_user.karma_points += request.karma_points;
                                accepted_user.save()
                                    .then(accepted_user => {
                                        // Fetching Requested User
                                        User.findById(new mongoose.Types.ObjectId(request.user_id))
                                            .then(requested_user => {
                                                requested_user.karma_points -= request.karma_points;
                                                requested_user.save()
                                                    .then(requested_user => {
                                                        // Check if accepted user having offer else create offer
                                                        Offer.findOne({ $and: [{ user_id: accepted_user_id }, { offer_name: request.request_name }] })
                                                            .then(offer => {
                                                                console.log(offer);
                                                                if (offer) {
                                                                    offer.status = 'booked';
                                                                    offer.save()
                                                                        .then(offer => res.json({
                                                                            request,
                                                                            offer,
                                                                            requested_user,
                                                                            accepted_user
                                                                        }))
                                                                        .catch(err => {
                                                                            throw err;
                                                                        });
                                                                } else {
                                                                    offer = new Offer({
                                                                        user_id: accepted_user_id,
                                                                        offer_name: request.request_name,
                                                                        offer_description: request.request_description,
                                                                        karma_points_expected: request.karma_points,
                                                                        location: accepted_user.location,
                                                                        status: 'booked'
                                                                    })
                                                                    offer.save()
                                                                        .then(offer => res.json({
                                                                            request,
                                                                            offer,
                                                                            requested_user,
                                                                            accepted_user
                                                                        }))
                                                                        .catch(err => {
                                                                            throw err;
                                                                        });
                                                                }
                                                            })
                                                            .catch(err => {
                                                                throw err;
                                                            });
                                                    })
                                                    .catch(err => {
                                                        throw err;
                                                    });
                                            })
                                            .catch(err => {
                                                throw err;
                                            });
                                    })
                                    .catch(err => {
                                        throw err;
                                    });
                            })
                            .catch(err => {
                                throw err;
                            });
                    })
                    .catch(err => {
                        throw err;
                    });
            })
            .catch(err => res.status(404).json({ err: 'Request not found' }));
    }
);

// @route   POST api/request/
// @desc    Create a new request
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validateRequest,
    (req, res) => {
        // Checking Availabale Karma points
        User.findOne({ email: req.user.email })
            .then(user => {
                if (user.karma_points < req.body.karma_points) {
                    return res.status(400).json({ err: 'Not enough Karma points' });
                }

                let request = new Request({
                    user_id: new mongoose.Types.ObjectId(req.user.id),
                    location: req.body.location,
                    request_name: req.body.request_name,
                    request_description: req.body.request_description,
                    karma_points: req.body.karma_points
                });
                console.log(request);
                request.save()
                    .then(request => res.json({ msg: "Request Created", request }))
                    .catch(err => res.status(400).json({ err: err + "Request not created" }));
            })
            .catch(err => res.status(404).json({ noUserFound: 'No user found' }));
    }
);


// @route   DELETE api/request/:id
// @desc    Delete a request
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Request.findById(req.params.id)
            .then(request => {
                if (request.user_id.toString() !== req.user.id) {
                    return res.status(401).json({ notAuthorized: 'User not authorized' });
                }
                request.remove()
                    .then(() => res.json({ success: true }))
                    .catch(err => res.status(404).json({ err: 'Request not found' }));
            })
            .catch(err => res.status(404).json({ err: 'Request not found' }));
    }
);



module.exports = router;