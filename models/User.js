const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  bag: {
    type: Object,
    default: {}
  },
  address: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("User", userSchema);
