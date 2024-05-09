const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopOwnerSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
        password: { type: String },
        shopId: { type: String }
    },
    {
        timestamps: true
    }
);

const ShopOwner = mongoose.model("shopowners", ShopOwnerSchema);

module.exports = { ShopOwner };
