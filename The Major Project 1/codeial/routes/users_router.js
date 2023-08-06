const express = require('express');
const router = express.Router();
const usersController = require('../controller/users_controllers');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.get('/sign-out', usersController.signOut);

router.post('/create', usersController.create);

router.post('/create-session', usersController.createSession);

module.exports = router;
