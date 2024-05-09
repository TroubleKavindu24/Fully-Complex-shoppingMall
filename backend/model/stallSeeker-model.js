const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StallSeekerSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        phoneNumber: { type: String },
        registrationID: { type: String },
        registrationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'] } 
    },
    {
        timestamps: true
    }
);

const StallSeeker = mongoose.model("stallSeeker", StallSeekerSchema);

module.exports = { StallSeeker };
