const express = require('express');
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

router.post('/add', function (req, res, next) {
  //SKAPA PRODUKT
});


module.exports = router;
