const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    date: Number,
    topic: String
});

module.exports = mongoose.model('Event', eventSchema);