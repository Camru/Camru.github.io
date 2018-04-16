const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');

const PORT = 3000;
const oneYear = 86400000 * 365;
const routes = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// dev error handler, stack traces printed
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// prod error handler, no stack traces
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT, function () {
  console.log(`App running at http://localhost:${PORT}/`);
})

module.exports = app;