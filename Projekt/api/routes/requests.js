const express = require('express');
const router = express.Router();

const spotifyWebAPI = require('../helpers/spotify/spotify');
const spotify = new spotifyWebAPI();

const mongoose = require('mongoose');
const Request = require('../models/request');
const Set = require('../models/set');

router.get('/', (req, res, next) => {
	Request.find().exec().then(requests => {
		res.status(200).json(({
			message: 'OK',
			result: requests
		}));
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			message: 'Internal Server Error',
			error: err
		});
	});
});

router.post('/', (req, res, next) => {
    if ((trackID = req.body.trackID) && (setID = req.body.setID)) {
        spotify.getAccessToken().then(() => {
            spotify.getTrack(trackID).then(data => {
                const request = new Request({
                    _id: mongoose.Types.ObjectId(),
                    _setID: mongoose.Types.ObjectId(setID),
                    spotifyID: data.spotifyID,
                    name: data.name,
                    artist: data.artist,
                    duration_ms: data.duration_ms,
                    popularity: data.popularity,
                    acousticness: data.acousticness,
                    danceability: data.danceability,
                    energy: data.energy,
                    instrumentalness: data.instrumentalness,
                    liveness: data.liveness,
                    loudness: data.loudness,
                    speechiness: data.speechiness,
                    valence: data.valence,
                    tempo: data.tempo
                });

                request.save().then(result => {
                    res.status(201).json({
                        message: 'OK',
                        result: result
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: err
                    });
                });
            }).catch(err => {
                if (err == 'invalidTrackID' || err.message == 'Bad Request') {
                    res.status(400).json({
                        message: 'Bad Request',
                        error: 'Invalid Property: trackID'
                    });
                } else {
                    res.status(500).json({
                        message: 'Internal Server Error',
                        error: err.message
                    });
                }
            });
        }).catch(err => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            });
        });
    } else {
        res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: trackID'
        });
    }
});

module.exports = router;