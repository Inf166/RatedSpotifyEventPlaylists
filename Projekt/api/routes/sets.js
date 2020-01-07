const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const set = require('../models/set');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Response for /sets'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'POST Response for /sets'
    });
});

router.get('/:setID', (req, res, next) => {
    const id = req.params.setID;

    res.status(200).json({
        message: 'Set Information',
        id: id
    });
});

router.delete('/:setID', (req, res, next) => {
    const id = req.params.setID;

    res.status(200).json({
        message: 'Set Deleted',
        id: id
    });
});

module.exports = router;