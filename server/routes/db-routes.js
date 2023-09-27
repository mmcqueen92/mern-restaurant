const express = require("express");
const router = express.Router();
const Order = require("../models/orderSchema");
const Item = require("../models/itemSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
      });
      // ADD TO USERS ORDER ARRAY HERE:

      await User.findOneAndUpdate({email: email}, {$push: {orders: order._id}})
      order = JSON.stringify(order);
      res.status(201).json(order);
    } catch (e) {
      res.status(500).json({
        ok: false,
        message: "Failed to create order",
      });
    }
  };
  createOrder();
});

// POST request to create new item
router.post("/create-item", (req, res, next) => {
  const { name, description, price, category } = req.body;
  Item.create({
    name,
    price,
    description,
    category,
  })
    .then((data) => res.json(data))
    .catch(next);
});

// POST request to edit item
router.post("/edit-item", (req, res, next) => {
  const { id, name, description, price, category } = req.body;
  Item.findOneAndUpdate(
    { _id: id },
    { name, description, price, category },
    { new: true }
  ).then((data) => res.json(data));
});

// POST request to update an orders status (from req.body)
router.post("/update-order-status", (req, res, next) => {
  const { orderId, updatedStatus } = req.body;
  Order.findOneAndUpdate(
    { _id: orderId },
    { status: updatedStatus },
    { new: true }
  ).then((data) => res.json(data));
});

// POST request to delete item
router.post("/delete-item", (req, res, next) => {
  const { itemId } = req.body;
  Item.deleteOne({ _id: itemId })
    .then((data) => res.json(data))
    .catch(next);
});

// GET request to fetch all menu items
router.get("/menu", (req, res, next) => {
  Item.find({}).then((data) => {
    res.json(data);
  });
});

// GET request to fetch an order by order._id (req.params.id)
router.get("/find-order/:id", (req, res, next) => {
  const orderId = req.params.id;
  Order.findOne({ _id: orderId }).then((data) => {
    res.json(data);
  });
});

// GET request to fetch paid orders
router.get("/paid-orders", (req, res, next) => {
  Order.find({ status: "paid" }).then((data) => {
    res.json(data);
  });
});

// GET request to fetch in-progress orders
router.get("/in-progress-orders", (req, res, next) => {
  Order.find({ status: "in-progress" }).then((data) => {
    res.json(data);
  });
});

// GET request to fetch en-route orders
router.get("/en-route-orders", (req, res, next) => {
  Order.find({ status: "en-route" }).then((data) => {
    res.json(data);
  });
});

// GET request to enable an item by item._id (req.params.id)
router.get("/enable-item/:id", (req, res, next) => {
  const itemId = req.params.id;
  Item.findOneAndUpdate(
    { _id: itemId },
    { isActive: true },
    { new: true }
  ).then((data) => res.json(data));
});

// GET request to disable an item by item._id (req.params.id)
router.get("/disable-item/:id", (req, res, next) => {
  const itemId = req.params.id;
  Item.findOneAndUpdate(
    { _id: itemId },
    { isActive: false },
    { new: true }
  ).then((data) => res.json(data));
});

// POST request to create new user
router.post("/create-new-user", async (req, res, next) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ email: email });

  if (userWithEmail) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "A user with that email already exists",
      });
  } else if (!userWithEmail) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({
      email,
      hashedPassword,
      isAdmin: true,
    })
      .then((data) => {
        const jwtToken = jwt.sign(
          {
            id: data._id,
            email: data.email,
          },
          process.env.JWT_SECRET
        );
        const user = {
          email: data.email,
          addresses: data.addresses,
          defaultAddress: data.defaultAddress,
          isAdmin: data.isAdmin,
          _id: data._id
        };
        res.json({
          status: "ok",
          message: "User created successfully",
          token: jwtToken,
          user: user,
        });
      })
      .catch(next);
  }
});

// POST request to login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ email: email }).catch((e) =>
    console.log("ERROR: ", e)
  );

  if (!userWithEmail) {
    return res
      .status(401)
      .json({ message: "Email or password does not match" });
  } else if (!bcrypt.compareSync(password, userWithEmail.hashedPassword)) {
    return res
      .status(401)
      .json({ message: "Email or password does not match" });
  } else if (bcrypt.compareSync(password, userWithEmail.hashedPassword)) {
    const jwtToken = jwt.sign(
      {
        id: userWithEmail._id,
        email: userWithEmail.email,
      },
      process.env.JWT_SECRET
    );
    const user = {
      email: userWithEmail.email,
      addresses: userWithEmail.addresses,
      defaultAddress: userWithEmail.defaultAddress,
      isAdmin: userWithEmail.isAdmin,
      _id: userWithEmail._id
    };
    res.json({
      status: "ok",
      message: "Sign in successful",
      token: jwtToken,
      user: user,
    });
  }
});

// POST request to add new address to users address list
router.post("/add-new-address", (req, res, next) => {
  const { email, newAddress } = req.body;
  User.findOneAndUpdate(
    { email: email },
    { $push: { addresses: newAddress } },
    { new: true }
  ).then((data) => {
    const newAddresses = data.addresses;
    res.json(newAddresses);
  });
});

// POST request to delete address from users address list
router.post("/delete-address", (req, res, next) => {
  const { email, newAddresses } = req.body;
  User.findOneAndUpdate(
    { email: email },
    { addresses: newAddresses },
    { new: true }
  ).then((data) => {
    const newAddresses = data.addresses;
    res.json(newAddresses);
  });
});

// POST request to set a users default address
router.post("/add-default-address", (req, res, next) => {
  const { email, newDefaultAddress } = req.body;
  User.findOneAndUpdate(
    { email: email },
    { defaultAddress: newDefaultAddress },
    { new: true }
  ).then((data) => {
    const updatedDefaultAddress = data.defaultAddress;
    res.json(updatedDefaultAddress);
  });
});

// GET request for users orders array
router.get("/user-orders/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({_id: userId})
  .then((data) => {
    const orders = data.orders
    res.json(orders)
  })
  .catch((e) => console.log("ERROR: ", e)
);
})

module.exports = router;
