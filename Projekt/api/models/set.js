const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Set', setSchema);