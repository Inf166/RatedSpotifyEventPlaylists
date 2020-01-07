const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    topic: String,
    date: Number,
    sets: [Number]
});

module.exports = mongoose.model('Event', eventSchema);