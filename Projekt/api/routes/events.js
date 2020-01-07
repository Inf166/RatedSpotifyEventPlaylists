const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const event = require('../models/event');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Response for /events'
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