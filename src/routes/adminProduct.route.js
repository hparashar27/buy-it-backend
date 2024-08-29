const express  =  require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate,productController.createProduct);
router.get("/:id",authenticate,productController.findProductById);
router.post("/creates",authenticate,productController.createMultipleProducts);
router.delete("/:id",authenticate,productController.deleteProduct);
router.put("/:id",authenticate,productController.updateProduct);

module.exports = router;