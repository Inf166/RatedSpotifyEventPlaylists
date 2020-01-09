const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _eventID: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Set', setSchema);