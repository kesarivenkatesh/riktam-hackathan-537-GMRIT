const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const RequestSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // TODO: come here to Location API
    location: {
        type: String,
    },
    request_name: {
        type: String,
        required: true,
    },
    request_description: {
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
}, { timestamps: true });


module.exports = mongoose.model('requests', RequestSchema);
