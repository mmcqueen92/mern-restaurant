const express = require("express");
const cors = require("cors");
require("./loadEnvironment.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbRouter = require('./routes/db-routes.js')
const PORT = process.env.PORT || 5050;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
// ----- TESTING DIGITAL OCEAN CONNECTION START -----
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
// ----- TESTING DIGITAL OCEAN CONNECTION END -----



// db routes
app.use('/api', dbRouter);

// send stripe key to create payment
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// create payment intent for stripe payment
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "cad",
      amount: 555,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  //   console.log("DB: ", db)
});
