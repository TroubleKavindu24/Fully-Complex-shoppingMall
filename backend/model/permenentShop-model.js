const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermanentShopSchema = new Schema(
    {
        shopID: { type: String },
        shopName: { type: String },
        floor: { type: String },
        ownerID: { type: String }, 
        imageUrl: { type: String }  
    },
    {
        timestamps: true
    }
);

const PermanentShop = mongoose.model("permanentShop", PermanentShopSchema);

module.exports = { PermanentShop };
