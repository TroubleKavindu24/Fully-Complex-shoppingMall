const express = require("express");
const router = express.Router();
const ShopOwnerController = require("../controller/shopOwner-controller");

// Routes for managing shop owners
router.post("/add", ShopOwnerController.addShopOwner);
router.get("/get", ShopOwnerController.getAllShopOwners);
router.get("/get/:id", ShopOwnerController.getShopOwnerById);
router.put("/update/:id", ShopOwnerController.updateShopOwner);
router.delete("/delete/:id", ShopOwnerController.deleteShopOwner);

// Route for shop owner login
router.post("/login", ShopOwnerController.loginShopOwner);

module.exports = router;
