const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");

// Order schema expects the following object:
// {
//  email: String,
//  items: Array,
//  address: String,
//  status: String
// }

// POST request to "/api/orders":
router.post("/orders", (req, res, next) => {
  Order.create(req.body)
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;