var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

/** routes objects */
var index = require('./routes/index');
var users = require('./routes/users');
var setup = require('./routes/setup');

var app = express();

/** app configurations */
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');


/** allowing cross origin request for future extensibility */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
 * App Defined Mounted Routes
 */
app.use('/', index);
app.use('/users', users);
app.use('/setup', setup);



/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



/**
 * error handlers
 */

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

/** production error handler */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;