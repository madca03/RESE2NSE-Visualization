var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// <<<<<<< 5a2dd2b2873fdc9a0127d6e6291452a9619b29ce

// var nodes = require('./routes/nodes/nodes');
// var graph = require('./routes/graph/graph');

// =======
var routes = require('./routes/index');
var plot = require('./routes/plot/plot');
var graph = require('./routes/graph/index');
var nodes = require('./routes/nodes/index');
// >>>>>>> add code from mark's repo

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// <<<<<<< 5a2dd2b2873fdc9a0127d6e6291452a9619b29ce


// app.get('/plot', function(req, res) {
   // res.render('plot');
// });
// =======
app.use('/', graph);
app.use('/nodes', nodes);
// app.use('/', routes);
// app.use('/graph', graph);
// app.use('/', nodes);
app.use('/plot', plot);

// >>>>>>> add code from mark's repo

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
