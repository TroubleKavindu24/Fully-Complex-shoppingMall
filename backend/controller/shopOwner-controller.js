const { ShopOwner } = require("../model/shopOwner-modal");

class ShopOwnerController {
    // Add Shop Owner
    async addShopOwner(req, res) {
        const { name, email, phoneNumber, password, shopId } = req.body;
        const shopOwner = new ShopOwner({ name, email, phoneNumber, password, shopId });

        try {
            await shopOwner.save();
            res.status(201).json({ success: true, shopOwner });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Get all Shop Owners
    async getAllShopOwners(req, res) {
        try {
            const shopOwners = await ShopOwner.find();
            res.status(200).json({ success: true, shopOwners });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Get Shop Owner by ID
    async getShopOwnerById(req, res) {
        const { id } = req.params;

        try {
            const shopOwner = await ShopOwner.findById(id);
            if (!shopOwner) {
                res.status(404).json({ success: false, message: "Shop Owner not found" });
                return;
            }
            res.status(200).json({ success: true, shopOwner });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Update Shop Owner
    async updateShopOwner(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updatedShopOwner = await ShopOwner.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedShopOwner) {
                res.status(404).json({ success: false, message: "Shop Owner not found" });
                return;
            }
            res.status(200).json({ success: true, updatedShopOwner });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // Delete Shop Owner
    async deleteShopOwner(req, res) {
        const { id } = req.params;

        try {
            const deletedShopOwner = await ShopOwner.findByIdAndDelete(id);
            if (!deletedShopOwner) {
                res.status(404).json({ success: false, message: "Shop Owner not found" });
                return;
            }
            res.status(200).json({ success: true, message: "Shop Owner deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Login Shop Owner
    async loginShopOwner(req, res) {
        const { email, password } = req.body;

        try {
            const shopOwner = await ShopOwner.findOne({ email });
            if (!shopOwner) {
                return res.status(200).json({ success: false, message: 'Shop owner not found' });
            }
 
            if (password !== shopOwner.password) {
                return res.status(200).json({ success: false, message: 'Invalid password' });
            }

            res.status(200).json({ success: true, shopOwner });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new ShopOwnerController();
