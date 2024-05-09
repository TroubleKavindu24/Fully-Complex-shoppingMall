const { Cart } = require("../model/cart-modal");

class CartController {
    // Add Cart Item
    async addCartItem(req, res) {
        const cartItem = new Cart(req.body);
        try {
            await cartItem.save();
            res.status(201).json({ success: true });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    // Retrieve Cart Items
    async getCartItems(req, res) {
        try {
            const cartItems = await Cart.find();
            res.json(cartItems);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Update Cart Item
    async updateCartItem(req, res) {
        const { customerID, stallID, itemID, price } = req.body;
        const { id } = req.params;

        try {
            let cartItem = await Cart.findById(id);
            if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

            cartItem.customerID = customerID;
            cartItem.stallID = stallID;
            cartItem.itemID = itemID;
            cartItem.price = price;

            await cartItem.save();
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Delete Cart Item
    async deleteCartItem(req, res) {
        const { id } = req.params;

        try {
            const cartItem = await Cart.findByIdAndDelete(id);
            if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
 
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CartController();
