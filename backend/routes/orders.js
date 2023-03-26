const express = require('express');
const router = express.Router();
const orderModel = require('../models/order-model');
const productModel = require('../models/product-model');



router.post('/add', async function (req, res) {

  const order = req.body;

  const products = req.body.products;
  const product = products.map(async product => {
    const productId = product.productId
    const quantity = product.quantity

    const foundProduct = await productModel.findOne({ _id: productId });
    const newLagerAmount = parseInt(foundProduct.lager) - parseInt(quantity);

    await productModel.updateOne({ _id: productId }, { $set: { lager: newLagerAmount } });
  });

  try {
    if (order) {
      const newOrder = await orderModel.create(order);
      res.status(201).json('We have recived your order and will ship out asap!')
    } else {
      res.status(400).json('Could not create order, check required fields');
    }
  } catch (err) {
    res.status(500).json(err);
  }

});



router.get('/all/:key', async function (req, res) {
  const key = req.params.key;
  try {
    if (key === process.env.API_KEY) {
      const orders = await orderModel.find().populate('user');
      res.status(200).send(orders);
    } else {
      res.status(401).json('message:' + ' Not Authorized!')
    }

  } catch (err) {
    res.status(500).json(err);
  }

});



router.post('/user', async function (req, res) {

  const userId = req.body.user;
  const token = req.body.token;

  try {
    if (token === process.env.API_KEY) {
      const userOrder = await orderModel.find({ user: userId }).populate('user').populate({ path: 'products.productId', model: 'products' })
      res.status(200).json(userOrder);
    } else {
      res.status(401).json('Only logged in users can see their orders, please login.');
    }
  } catch (err) {
    res.status(404).json(err.message + ' There are no orders for this user');
  }

});

module.exports = router;
