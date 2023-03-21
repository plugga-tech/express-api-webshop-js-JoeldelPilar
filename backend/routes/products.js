const express = require('express');
const productModel = require('../models/product-model');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // HÄMTA ALLA PRODUKTER
  res.send('Hämtar alla produkter.');
});

router.get('/:id', function (req, res, next) {
  // HÄMTA SPECIFIK PRODUKT
  // ID PÅ PRODUKT
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
