const { Item } = require("../model/item-model");

class ItemController {
  // Add Item
  async addItem(req, res) {
    const { itemID, itemName, itemDescription, itemPrice, itemImage, shopId } =
      req.body;
    const item = new Item({
      itemID,
      itemName,
      itemDescription,
      itemPrice,
      itemImage,
      shopId,
    });

    try {
      await item.save();
      res.status(201).json({ success: true, item });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // Get all Items
  async getAllItems(req, res) {
    try {
      const items = await Item.find();
      res.status(200).json({ success: true, items });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Get Item by ID
  async getItemById(req, res) {
    const { id } = req.params;

    try {
      const item = await Item.findById(id);
      if (!item) {
        res.status(404).json({ success: false, message: "Item not found" });
        return;
      }
      res.status(200).json({ success: true, item });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Update Item
  async updateItem(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedItem = await Item.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedItem) {
        res.status(404).json({ success: false, message: "Item not found" });
        return;
      }
      res.status(200).json({ success: true, updatedItem });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // Delete Item
  async deleteItem(req, res) {
    const { id } = req.params;

    try {
      const deletedItem = await Item.findByIdAndDelete(id);
      if (!deletedItem) {
        res.status(404).json({ success: false, message: "Item not found" });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async getItemsByShopId(req, res) {
    const { shopId } = req.params;

    try {
      const items = await Item.find({ shopId: shopId });
      if (items.length === 0) {
        res
          .status(404)
          .json({ success: false, message: "No items found for this shop." });
        return;
      }
      res.status(200).json({ success: true, items });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new ItemController();
