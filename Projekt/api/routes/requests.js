const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Response for /requests'
    });
});

router.post('/', (req, res, next) => {
    if (track = req.body.track) {
        res.status(201).json({
            message: 'Request Created.',
            track: track
        });
    } else {
        res.status(400).json({
            message: 'Bad Request. (Missing Property: track)'
        });
    }
});

module.exports = router;