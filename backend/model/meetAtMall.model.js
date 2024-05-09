const mongoose = require("mongoose");
const meetAtMallSchema = new mongoose.Schema({
  items: {
    type: Array,
  },
  nic: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  cartTotal: {
    type: String,
  },
});

module.exports = mongoose.model("MeetAtMall", meetAtMallSchema);
