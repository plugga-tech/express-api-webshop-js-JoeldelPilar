const express = require('express');
const productModel = require('../models/product-model');
const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const products = await productModel.find();
    if (products.length === 0) {
      res.status(200).json('No products in database')
    }
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json(error, 'Could not load products, please try again later.')
  }
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

  const token = req.body.token
  if (token !== (process.env.API_KEY)) {
    return res.status(401).json('Unauthorized request!');
  }

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
    res.status(200).json('New lager status is: ' + newLagerStatus);
  } else {
    try {
      const product = await productModel.create(newProduct).catch(err => {
        res.status(400).json(err, 'Could not add product, check product if product input values are correct')
      });
      res.status(201).send(product);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});

module.exports = router;
