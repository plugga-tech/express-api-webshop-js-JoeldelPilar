const express = require('express');
const productModel = require('../models/product-model');
const router = express.Router();

router.get('/', async function (req, res, next) {
  const products = await productModel.find();
  res.status(200).send(products);
});

router.get('/:id', async function (req, res, next) {

  const product = req.params.id
  const foundProduct = await productModel.findOne({ _id: product });

  try {
    if (foundProduct) {
      res.status(200).send(foundProduct);
    } else {
      res.status(404).send('Could not find product.');
    }
  } catch (error) {
    if (error.code === 'ECONNRESET') {
      res.status(500).send('Connection was lost')
    } else {
      res.status(500).send(error);
    }

  }

});

router.post('/add', async function (req, res, next) {
  //SKAPA PRODUKT
  const token = req.body.token;
  const existingProduct = await productModel.findOne({ name: req.body.name });

  if (existingProduct) {
    const newLagerStatus = parseInt(existingProduct.lager) + parseInt(req.body.lager);
    const updateLager = await productModel.updateOne({ name: req.body.name }, { $set: { lager: newLagerStatus } });
    console.log(updateLager);
    res.status(201).json('New lager status is: ' + newLagerStatus);
  } else {
    if (token === null) {
      return res.status(401).json('Unauthorized request!');
    }
    try {
      const newProduct = await productModel.create(req.body);
      res.status(200).send(newProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});


module.exports = router;
