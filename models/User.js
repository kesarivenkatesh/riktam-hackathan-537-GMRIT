const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32,
        trim: true,
    },
    contact_number: {
        type: String,
        required: true,
        maxlength: 10,
        trim: true,
        minlength: 10,
    },
    karma_points: {
        type: Number,
        default: 0,
    }
}, { TimeStamps: true });


module.exports = mongoose.model('users', UserSchema);