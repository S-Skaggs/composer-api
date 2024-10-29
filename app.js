var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');

var indexRouter = require('./routes/index');

// Create a reference to the express middleware
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Method to generate a 404 status for any request without a matching route
app.use((req, res, next) => {
    next(createError(404));
});

/*
    Error-handling middleware always takes four arguments.
    You must provide four arguments to identify it as an error-handling middleware function.
    Even if you don’t need to use the next object, you must specify it to maintain the signature.
    Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.
*/
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        type: 'error',
        status: res.status,
        message: err.message,
        stack: req.app.get('env') === 'development' ? err.stack : undefined
    });
});

module.exports = app;
