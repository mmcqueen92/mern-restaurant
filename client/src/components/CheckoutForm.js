import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const { cart, address, email, setCart, setAddress, setEmail } = props;
  let items;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
    
      // payment success block. add order to db here
      setMessage("Payment status: " + paymentIntent.status);

      // parse cart for create-order
      items = cart.map((item) => {
        return {
          itemId: item._id,
          quantity: item.quantity,
        };
      });

      // api request to create-order
      fetch("http://localhost:5050/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          address: address,
          email: email,
          status: "paid",
        }),
      })
      .then((res) => res.json())
      .then((res) => {
        const resObj = JSON.parse(res)
        setAddress("");
        setCart([]);
        setEmail("");
        navigate(`/view-order/${resObj._id}`)
      })
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <button>
        <span>{isProcessing ? "Processing..." : "Pay now"}</span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
