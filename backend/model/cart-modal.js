const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    CartID: { type: String },
    customerID: { type: String },
    stallID: { type: String },
    itemID: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("cart", CartSchema);

module.exports = { Cart };
