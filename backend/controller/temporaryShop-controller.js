const { TemporaryShop } = require("../model/temporaryShop-model");

class TemporaryShopController {
    // Add Temporary Shop
    async addTemporaryShop(req, res) {
        const { stallID, stallName, stallDescription, stallImage, ownerID } = req.body;
        const temporaryShop = new TemporaryShop({ stallID, stallName, stallDescription, stallImage, ownerID });

        try {
            await temporaryShop.save();
            res.status(201).json({ success: true, temporaryShop });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Get all Temporary Shops
    async getAllTemporaryShops(req, res) {
        try {
            const temporaryShops = await TemporaryShop.find();
            res.status(200).json({ success: true, temporaryShops });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Get Temporary Shop by ID
    async getTemporaryShopById(req, res) {
        const { id } = req.params;

        try {
            const temporaryShop = await TemporaryShop.findById(id);
            if (!temporaryShop) {
                res.status(404).json({ success: false, message: "Temporary Shop not found" });
                return;
            }
            res.status(200).json({ success: true, temporaryShop });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Update Temporary Shop
    async updateTemporaryShop(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedTemporaryShop = await TemporaryShop.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedTemporaryShop) {
                res.status(404).json({ success: false, message: "Temporary Shop not found" });
                return;
            }
            res.status(200).json({ success: true, updatedTemporaryShop });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Delete Temporary Shop
    async deleteTemporaryShop(req, res) {
        const { id } = req.params;

        try {
            const deletedTemporaryShop = await TemporaryShop.findByIdAndDelete(id);
            if (!deletedTemporaryShop) {
                res.status(404).json({ success: false, message: "Temporary Shop not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Temporary Shop deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new TemporaryShopController();
