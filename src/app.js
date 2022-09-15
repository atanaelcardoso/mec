'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// connecta ao banco
mongoose.connect('config.connectionString');

// carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

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
  res.header('Access-Controle-Allow-Origin', '*')
  res.header('Access-Controle-Allow-Headers', 'Origin, x-Requested-with, Content-Type, Accept, x-access-token');
  res.header('Access-Controle-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/product', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;