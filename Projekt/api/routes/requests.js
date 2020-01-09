const express = require('express');
const router = express.Router();

const spotifyWebAPI = require('../helpers/spotify/spotify');
const spotify = new spotifyWebAPI();

const mongoose = require('mongoose');
const Request = require('../models/request');

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
    if (track = req.body.track) {
        spotify.getAccessToken().then(() => {
            spotify.getTrack(track).then(data => {
                res.status(201).json({
                    message: 'Created',
                    result: data
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
            error: 'Missing Property: track'
        });
    }
});

module.exports = router;