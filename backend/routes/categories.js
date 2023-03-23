const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category-model');

router.post('/add', async function (req, res) {

  const token = req.body.token;
  const categoryName = req.body.name;
  const newCategory = {
    name: categoryName,
  };

  const category = await categoryModel.find({ name: categoryName });

  if (categoryName === category.name) {
    return res.status(400).json('Category ' + categoryName + ' is alreay existing.')
  }

  try {
    if (token === process.env.API_KEY) {
      await categoryModel.create(newCategory);
      res.status(201).json(newCategory);
    } else {
      res.status(401).json('message: ' + 'Not Authorized!');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/', async function (req, res) {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;