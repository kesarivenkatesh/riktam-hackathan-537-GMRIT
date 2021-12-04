const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');


// Load Validations
const { offerValidation } = require('../validations/offer');


// Load Models
const Offer = require('../models/offer');



// @route  GET api/offer
// @desc   Get all offers
// @access Public
router.get(
    '/',
    (req, res) => {
        Offer.find()
            .sort({ updatedAt: -1 })
            .then(offers => res.json(offers))
            .catch(err => res.status(404).json({ err: 'No offers found' }));
    }
)


// @route   POST api/offer
// @desc    Create Offer
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    offerValidation,
    (req, res) => {

        const offer = new Offer({
            user_id: new mongoose.Types.ObjectId(req.user.id),
            offer_name: req.body.offer_name,
            offer_description: req.body.offer_description,
            karma_points_expected: req.body.karma_points_expected,
            location: req.body.location
        });


        offer.save()
            .then(offer => res.json({ msg: "Offer Created Successfully", offer }))
            .catch(err => res.json({ err: err + "Offer not created" }))
    }
)


module.exports = router;