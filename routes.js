const router = require('express').Router();
const { checkCity } = require('../middleware/middleware')

const {
  brand,
  car,
  user,
  seller,
  transaction,
  getTotalSoldCar
} = require('../controller/controller');

router.post('/addBrand', brand);

router.post('/addCar', car);

router.post('/addUser', user);

router.post('/addSeller', seller);

router.post('/buyCar', checkCity, transaction);

router.get('/admin/getTotalSoldcar', getTotalSoldCar)

module.exports = router;
