const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controller/comment_controllers');

// router.get("/");

router.post('/create', commentController.createComments);



module.exports = router;