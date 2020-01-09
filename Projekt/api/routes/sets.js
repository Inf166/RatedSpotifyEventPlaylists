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
	if ((name = req.body.name) && (description = req.body.description) && (eventID = req.body.eventID)) {
		const set = new Set({
			_id: mongoose.Types.ObjectId(),
			_eventID: mongoose.Types.ObjectId(eventID),
			name: name,
			description: description
		});

		set.save().then(result => {
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
	} else {
		var missing = [];
		if (!req.body.name) {
			missing.push('name');
		}
		if (!req.body.description) {
			missing.push('description');
		}
        res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: ' + missing.join(', ')
        });
	}
});

router.delete('/:setID', (req, res, next) => {
    const id = req.params.setID;

    res.status(200).json({
        message: 'Set Deleted',
        id: id
    });
});

module.exports = router;