const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controller/comment_controllers');


router.post('/create', commentController.createComments);
router.get('/destroy/:id', passport.checkAuthentication ,commentController.destoryComments);



module.exports = router;