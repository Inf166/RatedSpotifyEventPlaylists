const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Number, required: true },
    topic: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);