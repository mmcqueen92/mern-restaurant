const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");
const Item = require("../models/itemSchema");

// Order schema expects the following object:
// {
//  email: String,
//  items: Array,
//  address: String,
//  status: String
// }

// POST request to create new order
router.post("/create-order", (req, res, next) => {
  const { items, address, email, status } = req.body;
  const createOrder = async () => {
    try {
      let order = await Order.create({
        items,
        address,
        email,
        status,
      })
      order = JSON.stringify(order)
      res.status(201).json(order)

    } catch(e) {
      res.status(500).json({
        ok: false,
        message: "Failed to create order"
      })
    }
  }
  createOrder();
});

// POST request to create new item
router.post("/create-item", (req, res, next) => {
  const {name, description, price} = req.body;
  Item.create({
    name,
    price,
    description,
  })
    .then((data) => res.json(data))
    .catch(next);
})

// GET request to fetch active menu items
router.get("/menu", (req, res, next) => {
  Item.find({isActive: true})
  .then((data) => {
    res.json(data);
  })
})

module.exports = router;
