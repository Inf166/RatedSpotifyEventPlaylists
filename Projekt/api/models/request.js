const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    spotify_id: String,
    name: String,
    artist: String,
    duration_ms: Number,
    popularity: Number,
    acousticness: Number,
    danceability: Number,
    energy: Number,
    instrumentalness: Number,
    liveness: Number,
    loudness: Number,
    speechiness: Number,
    valence: Number,
    tempo: Number
});

module.exports = mongoose.model('Request', requestSchema);