'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
//const configDB = require('./configDb.js');


const app = express();
const router = express.Router();

// connecta ao banco
mongoose.connect(config.connectionString);

// carrega os models
require('./models/product');
require('./models/customer');
require('./models/order');

//carega as routes
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

// Habilita o cors
app.use(function (req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-with, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/product', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;