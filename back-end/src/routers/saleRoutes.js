const express = require('express');

const { saleController } = require('../controllers');

const router = express.Router();

router.post('/register', saleController.registerSale);

module.exports = router;
