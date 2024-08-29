const express  =  require("express");
const router = express.Router();
const userControllers  = require("../controller/user.controller")

router.get("/profile",userControllers.getUserProfile);
router.get("/",userControllers.getAllUsers);

module.exports = router;