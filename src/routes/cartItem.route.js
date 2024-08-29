const express  =  require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller");
const authenticate = require("../middleware/authenticate");

router.delete("/:id",authenticate,cartItemController.deleteCartItem);
router.put("/:id",authenticate,cartItemController.updateCartItem);

module.exports = router;