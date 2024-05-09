
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemporaryShopSchema = new Schema(
    {
        stallID: { type: String },
        stallName: { type: String },
        stallDescription: { type: String },
        stallImage: { type: String }, 
        ownerID: { type: String },
    },
    {
        timestamps: true
    }
);

const TemporaryShop = mongoose.model("temporaryShop", TemporaryShopSchema);

module.exports = { TemporaryShop };
