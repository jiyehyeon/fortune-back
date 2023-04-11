const mongoose = require("mongoose");

const FortuneSchema = new mongoose.Schema({
  ganji: {
    type: String,
    required: true,
  },
  fortune: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("fortunes", FortuneSchema);
