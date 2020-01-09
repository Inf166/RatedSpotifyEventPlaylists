const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Event = require('../models/event');

router.get('/', (req, res, next) => {
	Event.find().exec().then(events => {
		res.status(200).json(({
			message: 'OK',
			result: events
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
    res.status(201).json({
        message: 'POST Response for /events'
    });
});

router.get('/:eventID', (req, res, next) => {
    const id = req.params.eventID;

    res.status(200).json({
        message: 'Event Information',
        id: id
    });
});

router.patch('/:eventID', (req, res, next) => {
    const id = req.params.eventID;

    res.status(200).json({
        message: 'Event Updated',
        id: id
    });
});

router.delete('/:eventID', (req, res, next) => {
    const id = req.params.eventID;

    res.status(200).json({
        message: 'Event Deleted',
        id: id
    });
});

module.exports = router;