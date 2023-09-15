import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export default function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const {cart, address, email} = props;

  useEffect(() => {
    fetch("http://localhost:5050/config").then(async (r) => {
      const { publishableKey } = await r.json();

      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    let itemTotal = 0;
    for (let item of cart) {
      itemTotal += item.price*item.quantity
    }
    console.log("ITEMTOTAL: ", itemTotal)
    fetch("http://localhost:5050/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({itemTotal: itemTotal}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();

      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div>
      <h1>Payment</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm cart={cart} address={address} email={email}/>
        </Elements>
      )}
    </div>
  );
}
