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

router.post('/add', async function (req, res) {

  const existingProduct = await productModel.findOne({ name: req.body.name });
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    lager: req.body.lager,
    category: req.body.category
  }

  if (existingProduct) {
    const newLagerStatus = parseInt(existingProduct.lager) + parseInt(req.body.lager);
    await productModel.updateOne({ name: req.body.name }, { $set: { lager: newLagerStatus } });
    res.status(201).json('New lager status is: ' + newLagerStatus);
  } else {
    try {
      const product = await productModel.create(newProduct).catch(err => {
        res.status(400).json(err, 'Could not add product, check product if product input values are correct')
      });
      res.status(200).send(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});


module.exports = router;
