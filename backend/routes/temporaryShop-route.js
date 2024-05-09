const express = require("express");
const router = express.Router();
const TemporaryShopController = require("../controller/temporaryShop-controller");

// Routes for managing temporary shops
router.post("/add", TemporaryShopController.addTemporaryShop);
router.get("/get", TemporaryShopController.getAllTemporaryShops);
router.get("/get/:id", TemporaryShopController.getTemporaryShopById);
router.put("/update/:id", TemporaryShopController.updateTemporaryShop);
router.delete("/delete/:id", TemporaryShopController.deleteTemporaryShop);

module.exports = router;
