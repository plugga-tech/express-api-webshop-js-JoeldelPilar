const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/add', function (req, res, next) {
  // SKAPA ORDER FÖR SPECIFIK USER
  // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
  res.send('Order add');
});

router.get('/all', function (req, res, next) {
  // HÄMTA ALLA ORDERS
  res.send('All orders endpoint.')
})

module.exports = router;
