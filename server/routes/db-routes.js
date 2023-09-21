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
  const {name, description, price, category} = req.body;
  Item.create({
    name,
    price,
    description,
    category,
  })
    .then((data) => res.json(data))
    .catch(next);
})

// POST request to edit item
router.post("/edit-item", (req, res, next) => {
  const {id, name, description, price, category} = req.body;
  Item.findOneAndUpdate({_id: id}, {name, description, price, category}, {new: true})
  .then((data) => res.json(data))
})

// POST request to update an orders status (from req.body)
router.post("/update-order-status", (req, res, next) => {
  const {orderId, updatedStatus} = req.body;
  Order.findOneAndUpdate({_id: orderId}, {status: updatedStatus}, {new: true})
  .then((data)  => res.json(data))
} )

// POST request to delete item
router.post("/delete-item", (req, res, next) => {
  const {itemId} = req.body;
  Item.deleteOne({_id: itemId})
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

// GET request to fetch paid orders
router.get("/paid-orders", (req, res, next) => {
  Order.find({status: "paid"})
  .then((data) => {
    res.json(data)
  })
})

// GET request to fetch in-progress orders
router.get("/in-progress-orders", (req, res, next) => {
  Order.find({status: "in-progress"})
  .then((data) => {
    res.json(data)
  })
})

// GET request to fetch en-route orders
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
