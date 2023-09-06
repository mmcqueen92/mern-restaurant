import {useState} from "react";

export default function CheckoutForm(props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <button>
        <span>
            {isProcessing ? "Processing..." : "Pay now"}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
