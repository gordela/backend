const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Style", styleSchema);
