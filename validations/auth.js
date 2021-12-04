const validator = require('validator');
const isEmpty = require('./is_empty');


const signupValidation = (req, res, next) => {
    let errors = {};

    req.body.firstname = !isEmpty(req.body.firstname) ? req.body.firstname : '';
    req.body.lastname = !isEmpty(req.body.lastname) ? req.body.lastname : '';
    req.body.email = !isEmpty(req.body.email) ? req.body.email : '';
    req.body.password = !isEmpty(req.body.password) ? req.body.password : '';
    req.body.password2 = !isEmpty(req.body.password2) ? req.body.password2 : '';
    req.body.contact_number = !isEmpty(req.body.contact_number) ? req.body.contact_number : '';


    if (!validator.isLength(req.body.firstname, { min: 2, max: 32 })) {
        errors.firstname = 'First name must be between 2 and 32 characters';
    }

    if (!validator.isLength(req.body.lastname, { min: 2, max: 32 })) {
        errors.lastname = 'Last name must be between 2 and 32 characters';
    }

    if (!validator.isEmail(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (!validator.isLength(req.body.password, { min: 8, max: 32 })) {
        errors.password = 'Password must be between 8 and 32 characters';
    }

    if (!validator.equals(req.body.password, req.body.password2)) {
        errors.password2 = 'Passwords must match';
    }

    if (!validator.isMobilePhone(req.body.contact_number, 'en-IN')) {
        errors.contact_number = 'Contact number is invalid';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}


const loginValidation = (req, res, next) => {
    let errors = {};

    req.body.email = !isEmpty(req.body.email) ? req.body.email : '';
    req.body.password = !isEmpty(req.body.password) ? req.body.password : '';

    if (!validator.isEmail(req.body.email)) {
        errors.email = 'Email is invalid';
    }

    if (!validator.isLength(req.body.password, { min: 8, max: 32 })) {
        errors.password = 'Password must be between 8 and 32 characters';
    }

    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();
}


module.exports = {
    signupValidation,
    loginValidation
}