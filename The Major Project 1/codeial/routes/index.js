const express =  require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require("../controller/home_controllers");

const userRouter = require('./users_router');
const commentRouter = require('./comments_router')


router.get("/", homeController.home);
router.post('/create-post',passport.checkAuthentication,homeController.createPost);

router.use('/users', userRouter);
router.use('/comments', commentRouter);



module.exports = router;