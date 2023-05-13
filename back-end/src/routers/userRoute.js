const express = require('express');

const { userController } = require('../controllers');
const validateToken = require('../middlewares/authValidation');

const router = express.Router();

router.post('/register', userController.customerRegister);

router.post('/admin/register', validateToken, userController.register);

router.get('/', userController.getUsers);

router.get('/:role', userController.getUsers);

router.delete('/destroy/:id', userController.deleteUser);

module.exports = router;
