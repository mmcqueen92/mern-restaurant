const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "The email field is required"],
  },
  hashedPassword: {
    type: String,
    required: [true, "The password field is required"],
  },
  addresses: {
    type: Array,
    default: [],
  },
  defaultAddress: {
    type: String,
    default: "",
  },
  orders: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', UserSchema)

module.exports = User;