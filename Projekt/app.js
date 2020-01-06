const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const eventRoutes = require('./api/routes/events');
const setRoutes = require('./api/routes/sets');
const requestRoutes = require('./api/routes/requests');
app.use('/events', eventRoutes);
app.use('/sets', setRoutes);
app.use('/requests', requestRoutes);

app.use((req, res, next) => {
    const error = new Error('Route Unavailable.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

module.exports = app;