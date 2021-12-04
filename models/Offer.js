const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid')

const OfferSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    offer_id: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    offer_name: {
        type: String,
        required: true,
    },
    offer_description: {
        type: String,
    },

    karma_points_expected: {
        type: Number,
        required: true,
    },
    // TODO: come here to Location API
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: 'available',
    },
    user_requests: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }]
    // TODO: Add feedback from the users
}, { timestamps: true });


module.exports = mongoose.model('offers', OfferSchema);