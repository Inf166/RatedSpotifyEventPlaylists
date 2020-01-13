const path = require('path');
const config = require(path.join(__dirname, 'api/config.json'));

const express = require('express');
const app = express();

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://' + config.mongodb.login + '@gdw-1920-dvxtw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
});

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