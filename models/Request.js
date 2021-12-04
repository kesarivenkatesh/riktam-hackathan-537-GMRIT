const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');


const RequestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    request_id: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    time_created: {
        type: Date,
        default: Date.now,
        required: true,
    },
    // TODO: come here to Location API
    location: {
        type: String,
    },
    stuff_type: {
        type: String,
        required: true,
    },
    karma_points: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    accepted_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
}, { TimeStamps: true });


module.exports = mongoose.model('requests', RequestSchema);
