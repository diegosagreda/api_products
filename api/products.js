const ProductController = require('../controllers/Product');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Api Shoppy');
  });
router.get('/products',ProductController.findAllProducts);
router.get('/price/:user_id/:nombre_producto', ProductController.getProductPrice);

module.exports = router;