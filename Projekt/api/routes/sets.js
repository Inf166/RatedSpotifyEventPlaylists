const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Set = require('../models/set');
const Event = require('../models/event');
const Request = require('../models/request');

const querySelect = '_id event name description';
const querySelectRequests = '_id track_id name artist duration_ms popularity acousticness danceability energy instrumentalness liveness loudness speechiness valence tempo key';

router.get('/', (req, res, next) => {
	Set.find().select(querySelect).populate('event', 'name').exec().then(sets => {
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
	if (setID = req.params.setID) {
		if (mongoose.Types.ObjectId.isValid(setID)) {
			Set.findById(setID).select(querySelect).populate('event', 'name').exec().then(set => {
				if (set) {
					var querySort = {};
					if (req.query && req.query.orderBy)
						querySort = { [req.query.orderBy]: 'desc' };

					Request.find({ set: mongoose.Types.ObjectId(setID) }).select(querySelectRequests).sort(querySort).exec().then(requests => {
						res.status(200).json({
							message: 'OK',
							result: {
								_id: set._id,
								event: set.event,
								name: set.name,
								description: set.description,
								requests: requests
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
					res.status(404).json({
						message: 'Not Found',
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

router.post('/', (req, res, next) => {
	if (eventID = req.body.eventID) {
		if (mongoose.Types.ObjectId.isValid(eventID)) {
            Event.findById(eventID).then(event => {
                if (!event) {
                    return res.status(404).json({
                        message: 'Not Found',
                        error: 'Invalid Property: eventID'
                    });
				}

				if ((name = req.body.name) && (description = req.body.description)) {
					const set = new Set({
						_id: mongoose.Types.ObjectId(),
						event: mongoose.Types.ObjectId(eventID),
						name: name,
						description: description
					});
			
					set.save().then(result => {
						res.status(201).json({
							message: 'OK',
							result: { 
								_id: result.id,
								event: result.event,
								name: result.name,
								description: result.description
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
                error: 'Invalid Property: eventID'
            });
		}
	} else {
        res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: eventID'
        });
	}
});

router.patch('/:setID', (req, res, next) => {
	if (setID = req.params.setID) {
		if (mongoose.Types.ObjectId.isValid(setID)) {
			const updateVariables = {};
			for (const variables of req.body) {
				updateVariables[variables.propName] = variables.value;
			}
	
			Set.updateOne({ _id: mongoose.Types.ObjectId(setID) }, { $set: updateVariables }).exec().then(result => {
				if (result.nModified > 0) {
					res.status(200).json({
						message: 'OK',
						result: 'Set Updated.'
					});
				} else {
					res.status(400).json({
						message: 'Bad Request',
						result: 'Invalid Property: setID'
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
	if (setID = req.body.setID) {
		if (mongoose.Types.ObjectId.isValid(setID)) {
			Set.deleteOne({ _id: mongoose.Types.ObjectId(setID) }).exec().then(result => {
				if (result.deletedCount > 0) {
					res.status(200).json({
						message: 'OK',
						result: 'Set Deleted.'
					});
				} else {
					res.status(400).json({
						message: 'Bad Request',
						result: 'Invalid Set ID.'
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
				result: 'Invalid Set ID.'
			});
		}
	} else {
		res.status(400).json({
            message: 'Bad Request',
            error: 'Missing Property: setID'
        });
	}
});

module.exports = router;