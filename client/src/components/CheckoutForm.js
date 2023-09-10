import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

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
      redirect: "if_required"
    });

    if (error) {
        setMessage(error.message)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // payment success block. add order to db here
        setMessage("Payment status: " + paymentIntent.status)
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
