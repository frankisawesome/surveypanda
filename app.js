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

//Modules
const db_con = require('./services/database.services')

//API Endpoints (controllers)
var surveysRouter = require('./controllers/survey.controller');
var companyRouter = require('./controllers/company.controller');
var userRouter = require('./controllers/user.controller');
var questionRouter = require('./controllers/questions.controller');
var searchRouter = require('./controllers/search.controller')

//const swaggerUI = require('swagger-ui-express');
//const swaggerDoc = require('../swagger.json')

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
db_con(mongoose, process.env.DB_CON);

//api routes
app.use('/api/surveys', surveysRouter);
app.use('/api/company', companyRouter);
app.use('/api/user', userRouter);
app.use('/api/question', questionRouter);
app.use('/api/search', searchRouter)

app.use(express.static(path.join(__dirname, '/build')));

//app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 404);
  res.send("Looks like you've hit a non existing route. Contact admin if you think this is a server side error")
});

module.exports = app;
