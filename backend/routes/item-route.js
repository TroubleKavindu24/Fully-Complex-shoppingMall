const express = require("express");
const router = express.Router();
const ItemController = require("../controller/item-controller");

// Routes for managing items
router.post("/add", ItemController.addItem);
router.get("/get", ItemController.getAllItems);
router.get("/get/:id", ItemController.getItemById);
router.put("/update/:id", ItemController.updateItem);
router.delete("/delete/:id", ItemController.deleteItem);
router.get("/item/get-by-shop/:shopId", ItemController.getItemsByShopId);

module.exports = router;
