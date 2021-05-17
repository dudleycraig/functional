const createError = require('http-errors');
const express = require('express');
const ApolloServer = require('apollo-server').ApolloServer;
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const engineRouter = require('./routes/engine');
const contactRouter = require('./routes/contact');
const indexRouter = require('./routes/index');

require('dotenv').config();
const port = process.env.ASSETS_PORT;

const app = express();
/**
app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
 **/

app.use(express.json());
app.use(cors());
app.set(port, port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// public assets folder
app.use(express.static(path.join(__dirname, 'public')));

// portfolio
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(['/home', '/portfolio'], indexRouter);
app.use('/contact', contactRouter);

// solenoid engine
app.use('/engine', express.static(path.join(__dirname, '../engine/build')));
app.use(['/engine/about', '/engine/console', '/engine/*'], engineRouter);

// everything else
app.use('/*', indexRouter);

app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
