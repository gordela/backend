var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  title: String,
  style: { _id: String, name: String },
  numberInStock: Number,
  price: Number,
  publishDate: Date,
  picture: String,
  pictureTwo: String,
  gender: String,
  countInBag: Number
});
module.exports = mongoose.model("Shoe", shoeSchema);
