const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Response for /requests'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'POST Response for /requests'
    });
});

module.exports = router;