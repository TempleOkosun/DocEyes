const bodyParser = require('body-parser');
var cors = require('cors');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// import the routes
// Default routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Doceyes routes
var readFileRouter = require('./routes/hashreadfile');
var readPathRouter = require('./routes/hashreadpath');
var writeFileRouter = require('./routes/hashwrite');

var app = express();

// set up middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
// default routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// DocEyes route
app.use('/hashreadfile', readFileRouter);
app.use('/hashreadpath', readPathRouter);
app.use('/hashwrite', writeFileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
