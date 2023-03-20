const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // HÄMTA ALLA USERS
  // SKICKA INTE MED LÖSENORD
  // BARA ID, NAMN + EMAIL PÅ ALLA USERS
  res.send('Hämta alla users, ID, namn och email.');
});

router.post('/', function (req, res, next) {
  // HÄMTA SPECIFIK USER 
  // SKICKA HELA OBJEKTET
});

router.post('/add', function (req, res, next) {
  // SKAPA USER
});

router.post('login', function (req, res, next) {
  // LOGGA IN USER
});

module.exports = router;
