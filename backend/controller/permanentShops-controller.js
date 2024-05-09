const { PermanentShop } = require("../model/permenentShop-model");

class PermanentShopController {
    // Add Permanent Shop
    async addPermanentShop(req, res) {
        const { shopID, shopName, floor, ownerID, image } = req.body;
        const permanentShop = new PermanentShop({ shopID, shopName, floor, ownerID, image });

        try {
            await permanentShop.save();
            res.status(201).json({ success: true, permanentShop });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Get all Permanent Shops
    async getAllPermanentShops(req, res) {
        try {
            const permanentShops = await PermanentShop.find();
            res.status(200).json({ success: true, permanentShops });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Get Permanent Shop by ID
    async getPermanentShopById(req, res) {
        const { id } = req.params;

        try {
            const permanentShop = await PermanentShop.findById(id);
            if (!permanentShop) {
                res.status(404).json({ success: false, message: "Permanent Shop not found" });
                return;
            }
            res.status(200).json({ success: true, permanentShop });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Update Permanent Shop
    async updatePermanentShop(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedPermanentShop = await PermanentShop.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedPermanentShop) {
                res.status(404).json({ success: false, message: "Permanent Shop not found" });
                return;
            }
            res.status(200).json({ success: true, updatedPermanentShop });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Delete Permanent Shop
    async deletePermanentShop(req, res) {
        const { id } = req.params;

        try {
            const deletedPermanentShop = await PermanentShop.findByIdAndDelete(id);
            if (!deletedPermanentShop) {
                res.status(404).json({ success: false, message: "Permanent Shop not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Permanent Shop deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new PermanentShopController();
