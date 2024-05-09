const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password : { type: String },
        phoneNumber: { type: String },
        deliveryAddress: { type: String }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = { Customer };
