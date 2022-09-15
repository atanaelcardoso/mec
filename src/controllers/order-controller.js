'use strict'

const repository = require('../repositories/order-repository');
const guid = require('quid');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.post = async(req, res, next) => {
  try {
    const token = req.body.toke || req.query.toke || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);
    
    await repository.create({
        customer: data.id,
        number: quid.raw().substring(0,6),
        items: req.body.items
    });
   res.status(201).send({ 
      message: 'Pedido cadasdrado com sucesso'
   });
  }  catch (e) {
      console.log(e);
      res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
};