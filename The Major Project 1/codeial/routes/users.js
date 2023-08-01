const express = require('express');
const router = express.Router();

const usersController = require('../controller/users_controllers');

router.get('/profile', usersController.profile);

module.exports = router;