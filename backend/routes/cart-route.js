const express = require("express");
const router = express.Router();
const CartController = require("../controller/cart-controller");

// Routes for managing cart items
router.post("/add", CartController.addCartItem);
router.get("/get", CartController.getCartItems);
router.put("/update/:id", CartController.updateCartItem);
router.delete("/delete/:id", CartController.deleteCartItem);

module.exports = router;
