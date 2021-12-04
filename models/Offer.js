const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    karma_points: {
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
}, { TimeStamps: true });


module.exports = mongoose.model('offers', OfferSchema);