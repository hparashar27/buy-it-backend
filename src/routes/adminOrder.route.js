const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

router.get("/",authenticate,orderController.getAllOrders);
router.put('/:orderId/placed',authenticate,orderController.placeOrder);
router.put('/:orderId/shipped',authenticate,orderController.shippedOrder);
router.put('/:orderId/confirmed',authenticate,orderController.confirmOrder);
router.put('/:orderId/delivered',authenticate,orderController.deliverOrder);
router.put('/:orderId/canelled',authenticate,orderController.cancelOrder);
router.put('/:orderId/deleted',authenticate,orderController.deleteOrder);

module.exports = router;