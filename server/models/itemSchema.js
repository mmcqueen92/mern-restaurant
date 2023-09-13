const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
  },
  price: {
    type: Number,
    required: [true, "The price field is required"],
  },
  description: {
    type: String,
    required: [true, "The description field is required"],
  },
  image: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Item = mongoose.model('item', ItemSchema)

module.exports = Item;