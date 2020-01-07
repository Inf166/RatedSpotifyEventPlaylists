const express = require('express');
const router = express.Router();

const spotifyWebAPI = require('../../dependencies/spotify/spotify');
const spotify = new spotifyWebAPI();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'OK',
        requests: []
    });
});

router.post('/', (req, res, next) => {
    if (track = req.body.track) {
        spotify.getAccessToken().then(() => {
            spotify.getTrack(track).then(data => {
                res.status(201).json({
                    message: 'Created',
                    track: data
                });
            }).catch(err => {
                if (err == 'invalidTrackID' || err.message == 'Bad Request') {
                    res.status(400).json({
                        message: 'Bad Request',
                        error: 'Invalid Track ID'
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