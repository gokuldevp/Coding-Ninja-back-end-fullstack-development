const express =  require('express');

const homeController = require("../controller/home_controllers")
const router = express.Router();

router.get("/", homeController.home)














module.exports = router;