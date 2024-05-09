const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        itemID: { type: String },
        itemName: { type: String },
        itemDescription: { type: String },
        itemPrice: { type: Number },
        itemImage: { type: String },
        shopId: { type: String },
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model("item", ItemSchema);

module.exports = { Item };
