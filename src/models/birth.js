const mongoose = require("mongoose");

const BirthSchema = new mongoose.Schema({
  birthdate: {
    type: Date,
    required: true,
    unique: true,
  },
  ganji: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("birth", BirthSchema);
