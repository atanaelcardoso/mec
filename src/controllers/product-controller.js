'use strict'

const validationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');

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

exports.getBySlug = async(req, res, next) => {
   try {
      var data = await repository.getBySlug(req.params.slug);
      res.status(200).send(data);
   } catch (e) {
      res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.getById = async(req, res, next) => {
  try {
    var data = await Product.findById(req.params.id,)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.getByTag = async(req, res, next) => {
    try {
      const data = await repository.getByTag(req.params.tag)
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
}

exports.post = async(req, res, next) => {
  let contract = new validationContract();
  contract.hasMinLen(req.body.title, 3, 'O título de conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O título de conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'O título de conter pelo menos 3 caracteres');

  // se os dados forem inválidos
  if (!contract.isValid()) {
 res.status(400).send(contract.error()).end();
    return;
  }
  
  try { 
     // cria o Blob Service
    //const blobSvc = azure.createBlobService(config.containerConnectionString);

    let filename = guind.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    // Sava a imagem
    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
      contentType: type
    }, function (error, result, response) {
      if (error) {
        filename = 'default-product.png'
      }
    });
    await repository.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      active: true,
      tags: req.body.tags,
      image: 'coloca imagem' + filename
    });  //coloca imagem http
    res.status(201).send({ 
      message: 'Produto cadasdrado com sucesso'
   });
  } catch (e) {
      res.status(500).send({
      message: 'Falha ao processar sua requisicao'
    });
  }
};

exports.put = async(req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
       message: 'Produto atualizando com sucesso'
   });
  } catch (e) {
      res.status(500).send({
      message: 'Falha ao processar sua requisicoa'
    });
  }
};

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.body.id);
      res.status(200).send({
        message: 'Produto removido com sucesso'
    });
  } catch (e) {
      res.status(500).send({
      message: 'Falha ao remover o produto'
    });
  }
};
