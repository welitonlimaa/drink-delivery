const express = require('express');
const { saleController } = require('../controllers');
const validateToken = require('../middlewares/authValidation');

const router = express.Router();

router.post('/register', validateToken, saleController.registerSale);

router.get('/:id', validateToken, saleController.getById);

router.patch('/:id', validateToken, saleController.updateById);

router.get('/', validateToken, saleController.getAll);

module.exports = router;
