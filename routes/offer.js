const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');


// Load Validations
const { offerValidation } = require('../validations/offer');


// Load Models
const Offer = require('../models/offer');



// @route  GET api/offer
// @desc   Get all offers
// @access Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Offer.find({ user_id: req.user.id })
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


// @route   DELETE api/offer/:id
// @desc    Delete Offer
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Offer.findById(req.params.id)
            .then(offer => {
                if (offer.user_id.toString() !== req.user.id) {
                    return res.status(401).json({ err: 'User not authorized' });
                }
                offer.remove()
                    .then(() => res.json({ msg: 'Offer Deleted' }))
                    .catch(err => res.status(404).json({ err: 'Offer not found' }));
            })
            .catch(err => res.status(404).json({ err: 'Offer not found' }));
    }
)


module.exports = router;