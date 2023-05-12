const express = require('express');

const { userController } = require('../controllers');

const router = express.Router();

router.post('/register', userController.register);

router.get('/', userController.getUsers);

router.get('/:role', userController.getUsers);

router.delete('/destroy/:id', userController.deleteUser);

module.exports = router;
