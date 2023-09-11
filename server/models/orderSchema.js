const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: [true, "The email field is required"],
  },
  items: {
    type: Array,
    required: [true, "The items field is required"],
  },
  address: {
    type: String,
    required: [true, "The address field is required"],
  },
  status: {
    type: String,
    required: [true, "The status field is required"],
  },
});

const Order = mongoose.model('order', OrderSchema)

module.exports = Order;