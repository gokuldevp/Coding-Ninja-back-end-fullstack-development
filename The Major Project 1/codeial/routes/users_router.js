const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controllers');

// Route that requires authentication
router.get(['/profile'],passport.checkAuthentication, usersController.profile);


// Other routes...
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.signOut);

router.post('/create', usersController.create);


router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

module.exports = router;

