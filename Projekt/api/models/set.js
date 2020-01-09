const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _eventID: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String
});

module.exports = mongoose.model('Set', setSchema);