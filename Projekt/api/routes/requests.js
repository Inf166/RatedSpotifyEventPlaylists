const express = require('express');
const router = express.Router();

const spotifyWebAPI = require('../helpers/spotify/spotify');
const spotify = new spotifyWebAPI();

const mongoose = require('mongoose');
const Request = require('../models/request');
const Set = require('../models/set');

const querySelect = '_id set track_id name artist duration_ms popularity acousticness danceability energy instrumentalness liveness loudness speechiness valence tempo key';

// https://open.spotify.com/track/TRACKID?XYZ
// spotify:track:TRACKID
const REGEX = /^(https:\/\/open.spotify.com\/track\/|spotify:track:)([a-zA-Z0-9]+)(.*)$/;

router.get('/', (req, res, next) => {
    Request.find().select(querySelect).populate('set', 'name').exec().then(requests => {
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
            Request.findById(requestID).select(querySelect).populate('set', 'name').exec().then(request => {
                if (request) {
                    res.status(200).json({
                        message: 'OK',
                        result: request
                    });
                } else {
                    res.status(404).json({
                        message: 'Not Found',
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
    if (setID = req.body.setID) {
        if (mongoose.Types.ObjectId.isValid(setID)) {
            Set.findById(setID).then(set => {
                if (!set) {
                    return res.status(404).json({
                        message: 'Not Found',
                        error: 'Invalid Property: setID'
                    });
                }

                if (trackID = req.body.trackID) {
                    const validURI = trackID.toString().match(REGEX);
                    if (validURI) {
                        const trackID = validURI[2];
                        Request.countDocuments({ set: mongoose.Types.ObjectId(setID), track_id: trackID }).then(count => {
                            if (count > 0) {
                                Request.findOneAndUpdate( { set: mongoose.Types.ObjectId(setID), track_id: trackID }, { $inc: { votes: 1 } }, { new: true }).then(request => {
                                    res.status(200).json({
                                        message: 'OK',
                                        result: { 
                                            _id: request.id,
                                            set: request.set,
                                            track_id: request.track_id,
                                            name: request.name,
                                            artist: request.artist,
                                            duration_ms: request.duration_ms,
                                            popularity: request.popularity,
                                            acousticness: request.acousticness,
                                            danceability: request.danceability,
                                            energy: request.energy,
                                            instrumentalness: request.instrumentalness,
                                            liveness: request.liveness,
                                            loudness: request.loudness,
                                            speechiness: request.speechiness,
                                            valence: request.valence,
                                            tempo: request.tempo,
                                            key: request.key,
                                            votes: request.votes
                                        }
                                    });
                                }).catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        message: 'Internal Server Error',
                                        error: err
                                    });
                                });
                            } else {
                                spotify.getAccessToken().then(() => {
                                    spotify.getTrack(trackID).then(data => {
                                        const request = new Request({
                                            _id: mongoose.Types.ObjectId(),
                                            set: mongoose.Types.ObjectId(setID),
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
                                            tempo: data.tempo,
                                            key: data.key
                                        });
                        
                                        request.save().then(result => {
                                            res.status(201).json({
                                                message: 'OK',
                                                result: { 
                                                    _id: result.id,
                                                    set: result.set,
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
                                                    tempo: result.tempo,
                                                    key: result.key,
                                                    votes: result.votes
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
                            error: 'Invalid Property: trackID'
                        });
                    }
                } else {
                    res.status(400).json({
                        message: 'Bad Request',
                        error: 'Missing Property: trackID'
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
                error: 'Invalid Property: setID'
            });
        }
    } else {
        res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: setID'
        });
    }
});

router.delete('/', (req, res, next) => {
	if (requestID = req.body.requestID) {
        if (mongoose.Types.ObjectId.isValid(requestID)) {
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