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
router.post("/create-order", (req, res, next) => {
    console.log("REQ.BODY: ", req.body)
  const { items, address, email, status } = req.body;
  Order.create({
    items,
    address,
    email,
    status,
  })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
