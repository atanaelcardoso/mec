'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  number: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    defult: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    defult: 'created'
  },
  Items: [{
    number: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
});

module.exports = mongoose.model('Order', schema);