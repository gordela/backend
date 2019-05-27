const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    process.env.TOKEN_SECRETs
  );
  return token;
};
module.exports = mongoose.model("User", userSchema);
