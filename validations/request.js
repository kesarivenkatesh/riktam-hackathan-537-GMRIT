const validator = require('validator');
const isEmpty = require('./is_empty');

const validateRequest = (req, res, next) => {
    let errors = {};

    req.body.location = !isEmpty(req.body.location) ? req.body.location : '';
    req.body.request_name = !isEmpty(req.body.request_name) ? req.body.request_name : '';
    req.body.request_description = !isEmpty(req.body.request_description) ? req.body.request_description : '';
    req.body.karma_points = !isEmpty(req.body.karma_points) ? req.body.karma_points : 0;


    if (validator.isEmpty(req.body.location)) {
        errors.location = 'Location field is required';
    }

    if (validator.isEmpty(req.body.request_name)) {
        errors.request_name = 'Request name field is required';
    }

    if (validator.isEmpty(req.body.request_description)) {
        errors.request_description = 'Request description field is required';
    }

    if (req.body.karma_points < 1) {
        errors.karma_points = 'Karma points must be greater than 0';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}


module.exports = { validateRequest }