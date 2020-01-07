const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    date: Number,
    topic: String,
    sets: [Number]
});

module.exports = mongoose.model('Event', eventSchema);