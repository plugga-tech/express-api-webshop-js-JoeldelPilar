const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');



router.get('/', async function (req, res, next) {

  try {
    const users = await userModel.find().select('name email _id');
    if (users.length === 0) {
      res.status(302).send('No users to show!');
    }
    res.status(200).json(users)

  } catch (err) {
    res.status(500).json(err);
  }


});

router.post('/', async function (req, res, next) {

  const user = req.body.id
  console.log(user);
  const foundUser = await userModel.findOne({ _id: user });
  console.log(foundUser);

  if (foundUser === null) {
    return res.status(404).json('Could not find user');
  }
  try {
    if (user === foundUser.id) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).json('Could not find user');
    }
  } catch (err) {
    res.status(500).json(err);
  }


});

router.post('/add', async function (req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }
    newUser = await userModel.create(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }


});

router.post('/login', async function (req, res, next) {

  const user = req.body
  const foundUser = await userModel.findOne({ email: user.email });
  if (foundUser.email === null) {
    return res.status(400).json('There is no user with this email.');
  }
  try {
    if (await bcrypt.compare(user.password, foundUser.password)) {
      res.status(200).json(foundUser.name + ' has logged in!');
    } else {
      res.status(401).json('Password was incorrect, please try again!')
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

