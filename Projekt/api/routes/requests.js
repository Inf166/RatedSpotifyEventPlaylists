const express = require('express');
const router = express.Router();

const spotifyWebAPI = require('../helpers/spotify/spotify');
const spotify = new spotifyWebAPI();

const mongoose = require('mongoose');
const Request = require('../models/request');

const querySelect = '_id _setID track_id name artist duration_ms popularity acousticness danceability energy instrumentalness liveness loudness speechiness valence tempo';

router.get('/', (req, res, next) => {
    Request.find().select(querySelect).exec().then(requests => {
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

router.get('/:requestID', (req, res, next) => {
	if (requestID = req.params.requestID) {
        if (mongoose.Types.ObjectId.isValid(requestID)) {
            Request.findById(requestID).select(querySelect).exec().then(request => {
                if (request) {
                    res.status(200).json({
                        message: 'OK',
                        result: request
                    });
                } else {
                    res.status(400).json({
                        message: 'Bad Request',
                        error: 'Invalid Property: requestID'
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err
                });
            });
        } else {
            res.status(400).json({
                message: 'Bad Request',
                error: 'Invalid Property: requestID'
            });
        }
	} else {
		res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: requestID'
        });
	}
});

router.post('/', (req, res, next) => {
    if ((trackID = req.body.trackID) && (setID = req.body.setID)) {
        spotify.getAccessToken().then(() => {
            spotify.getTrack(trackID).then(data => {
                const request = new Request({
                    _id: mongoose.Types.ObjectId(),
                    _setID: mongoose.Types.ObjectId(setID),
                    track_id: data.track_id,
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
                        result: { 
                            _id: result.id,
                            _setID: result._setID,
                            track_id: result.track_id,
                            name: result.name,
                            artist: result.artist,
                            duration_ms: result.duration_ms,
                            popularity: result.popularity,
                            acousticness: result.acousticness,
                            danceability: result.danceability,
                            energy: result.energy,
                            instrumentalness: result.instrumentalness,
                            liveness: result.liveness,
                            loudness: result.loudness,
                            speechiness: result.speechiness,
                            valence: result.valence,
                            tempo: result.tempo
                        }
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

router.delete('/', (req, res, next) => {
	if (requestID = req.body.requestID) {
        if (mongoose.Types.ObjectId.isValid(eventID)) {
            Request.deleteOne({ _id: mongoose.Types.ObjectId(requestID) }).exec().then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({
                        message: 'OK',
                        result: 'Request Deleted.'
                    });
                } else {
                    res.status(400).json({
                        message: 'Bad Request',
                        result: 'Invalid Request ID.'
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err
                });
            });
        } else {
            res.status(400).json({
                message: 'Bad Request',
                result: 'Invalid Request ID.'
            });
        }
	} else {
		res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: requestID'
        });
	}
});

module.exports = router;