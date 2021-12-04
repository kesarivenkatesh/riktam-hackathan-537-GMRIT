const validator = require('validator');
const isEmpty = require('./is_empty');


const offerValidation = (req, res, next) => {
    errors = {};

    req.body.offer_name = !isEmpty(req.body.offer_name) ? req.body.offer_name : '';
    req.body.offer_description = !isEmpty(req.body.offer_description) ? req.body.offer_description : '';
    req.body.karma_points_expected = !isEmpty(req.body.karma_points_expected) ? req.body.karma_points_expected : 0;
    req.body.location = !isEmpty(req.body.location) ? req.body.location : '';

    if (validator.isEmpty(req.body.offer_name)) {
        errors.offer_name = 'Item name is required';
    }

    if (!validator.isLength(req.body.offer_name, { min: 2, max: 30 })) {
        errors.offer_name = 'Item name must be between 2 and 30 characters';
    }

    if (validator.isEmpty(req.body.offer_description)) {
        errors.offer_description = 'Item description is required';
    }

    if (!validator.isLength(req.body.offer_description, { min: 2, max: 256 })) {
        errors.offer_description = 'Item description must be between 2 and 256 characters';
    }

    if (!validator.isNumeric(req.body.karma_points_expected.toString())) {
        errors.karma_points_expected = 'Karma points must be a number';
    }

    if (req.body.karma_points_expected < 1) {
        errors.karma_points_expected = 'Karma points must be greater than 0';
    }

    if (validator.isEmpty(req.body.location)) {
        errors.location = 'Location is required';
    }

    if (!validator.isLength(req.body.location, { min: 2, max: 30 })) {
        errors.location = 'Location must be between 2 and 30 characters';
    }


    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    offerValidation
}