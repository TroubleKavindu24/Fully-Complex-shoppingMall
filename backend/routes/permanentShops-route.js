const express = require("express");
const router = express.Router();
const PermanentShopController = require("../controller/permanentShops-controller");

// Routes for managing permanent shops
router.post("/add", PermanentShopController.addPermanentShop);
router.get("/get", PermanentShopController.getAllPermanentShops);
router.get("/get/:id", PermanentShopController.getPermanentShopById);
router.put("/update/:id", PermanentShopController.updatePermanentShop);
router.delete("/delete/:id", PermanentShopController.deletePermanentShop);

module.exports = router;