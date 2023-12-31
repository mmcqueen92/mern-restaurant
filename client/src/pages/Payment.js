import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

export default function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { cart, address, email, setCart, setAddress, setEmail } = props;

  let itemTotal = 0;
  for (let item of cart) {
    itemTotal += item.price * item.quantity;
  }
  itemTotal = itemTotal * 1.05 + 5;
  itemTotal *= 100;
  itemTotal = Math.round(itemTotal);


  useEffect(() => {
    fetch("http://localhost:5050/config", {mode: 'cors'}).then(async (r) => {
      const { publishableKey } = await r.json();

      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5050/create-payment-intent", {
      method: "POST",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemTotal: itemTotal }),

    }).then(async (r) => {
      const { clientSecret } = await r.json();

      setClientSecret(clientSecret);
    }).catch((err) => console.log(err))
  }, [itemTotal]);

  return (
    <div>
      <h1 className="payment-page-header">Payment</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            cart={cart}
            setCart={setCart}
            address={address}
            setAddress={setAddress}
            email={email}
            setEmail={setEmail}
          />
        </Elements>
      )}
    </div>
  );
}
