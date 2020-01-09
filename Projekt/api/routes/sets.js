const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Set = require('../models/set');

router.get('/', (req, res, next) => {
	Set.find().exec().then(sets => {
		res.status(200).json(({
			message: 'OK',
			result: sets
		}));
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			message: 'Internal Server Error',
			error: err
		});
	});
});

router.get('/:setID', (req, res, next) => {
	if (setID = req.body.setID) {
		Set.findById(setID).exec().then(set => {
			if (set) {
				res.status(200).json({
					message: 'OK',
					result: set
				});
			} else {
				res.status(400).json({
					message: 'Bad Request',
					error: 'Invalid Property: setID'
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
            error: 'Missing Property: setID'
        });
	}
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'POST Response for /sets'
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