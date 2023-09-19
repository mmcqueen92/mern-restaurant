const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");
const Item = require("../models/itemSchema");

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
      // res.redirect(`http://localhost:3000/view-order/${order._id}`)

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
  Item.find({})
  .then((data) => {
    res.json(data);
  })
})

// GET request to fetch an order by order._id (req.params.id)
router.get("/find-order/:id", (req, res, next) => {
  const orderId = req.params.id;
  Order.find({_id: orderId})
  .then((data) => {
    res.json(data);
  })
})

router.get("/paid-orders", (req, res, next) => {
  Order.find({status: "paid"})
  .then((data) => {
    res.json(data)
  })
})

router.get("/in-progress-orders", (req, res, next) => {
  Order.find({status: "in-progress"})
  .then((data) => {
    res.json(data)
  })
})

router.get("/en-route-orders", (req, res, next) => {
  Order.find({status: "en-route"})
  .then((data) => {
    res.json(data)
  })
})

// GET request to enable an item by item._id (req.params.id)
router.get("/enable-item/:id", (req, res, next) => {
  const itemId = req.params.id;
  Item.findOneAndUpdate({_id: itemId}, {isActive: true}, {new: true})
  .then((data)  => res.json(data))
})

// GET request to disable an item by item._id (req.params.id)
router.get("/disable-item/:id", (req, res, next) => {
  const itemId = req.params.id;
  Item.findOneAndUpdate({_id: itemId}, {isActive: false}, {new: true})
  .then((data)  => res.json(data))
})

module.exports = router;
