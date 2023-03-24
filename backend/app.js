const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
require('dotenv').config();

const Mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');

const app = express();

async function init() {
  try {
    const options = { useUnifiedTopology: true }
    await Mongoose.connect(('mongodb://127.0.0.1:27017/Joel-delPilar'), options);
    console.log('You are connected to the database');
  } catch (error) {
    console.log(error, 'Connection to database failed');
  }
}
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter);

init();

module.exports = app;
