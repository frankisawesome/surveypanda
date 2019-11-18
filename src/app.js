//Packages import
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require("cors")
const dotenv = require("dotenv")

//Endpoint routers
var surveysRouter = require('./controllers/survey.controller');
var companyRouter = require('./controllers/company.controller');
var userRouter = require('./controllers/user.controller')

//App
var app = express();

//essentials
app.use(helmet())
app.use(cors())
dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//db connection
mongoose.connect(process.env.DB_CON, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(() => console.log('Connection to DB successful'))
  .catch((err) => console.log(err))

//front end
//app.use(express.static('../reactpanda/build'));

//api routes
app.use('/surveys', surveysRouter);
app.use('/company', companyRouter);
app.use('/user', userRouter);

//catch 404 and forward to error handler
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
  res.send("Looks like you've hit a non existing route. Contact admin if you think this is a server side error")
});

module.exports = app;
