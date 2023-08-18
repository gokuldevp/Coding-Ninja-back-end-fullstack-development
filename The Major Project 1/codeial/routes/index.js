const express =  require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require("../controller/home_controllers");


router.get("/", homeController.home);
router.post('/create-post',passport.checkAuthentication,homeController.createPost);

router.use('/users', require('./users_router'));



module.exports = router;