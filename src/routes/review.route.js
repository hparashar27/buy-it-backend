const express  =  require("express");
const router = express.Router();

const reviewController = require("../controller/review.controller");
const authenticate = require("../middleware/authenticate");

router.post("/create",authenticate,reviewController.createReview);
router.put("/productId/:productId",authenticate,reviewController.getAllReivew);


module.exports = router;