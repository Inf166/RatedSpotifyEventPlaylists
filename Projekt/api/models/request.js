const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _setID: mongoose.Schema.Types.ObjectId,
    spotifyID: { type: String, required: true },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    duration_ms: { type: Number, required: true },
    popularity: { type: Number, required: true },
    acousticness: { type: Number, required: true },
    danceability: { type: Number, required: true },
    energy: { type: Number, required: true },
    instrumentalness: { type: Number, required: true },
    liveness: { type: Number, required: true },
    loudness: { type: Number, required: true },
    speechiness: { type: Number, required: true },
    valence: { type: Number, required: true },
    tempo: { type: Number, required: true }
});

module.exports = mongoose.model('Request', requestSchema);