const express = require('express');
const router = express.Router();
const usersController = require('../controller/users_controllers');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.signUp);

router.post('create-session', usersController.signIn);

module.exports = router;
