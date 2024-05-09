const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InteractiveMallEventSchema = new Schema(
    { 
        eventName: { type: String },
        description: { type: String },
        dateTime: { type: String },
        location: { type: String },
        category: { type: String },
        capacity: { type: Number, default: null },
        registrationLink: { type: String, default: null }
    },
    {
        timestamps: true
    }
);

const InteractiveMallEvent = mongoose.model("InteractiveMallEvent", InteractiveMallEventSchema);

module.exports = { InteractiveMallEvent };
