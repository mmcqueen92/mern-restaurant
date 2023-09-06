import {useEffect, useState} from "react";
import {loadStripe} from "stripe/stripe-js";

export default function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://localhost:5050/config")
        .then(async (r) => {
            const {publishableKey} = await r.json();

            setStripePromise(loadStripe(publishableKey));
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5050/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        })
        .then(async (r) => {
            const {clientSecret} = await r.json();

            setClientSecret(clientSecret);
        })
    }, [])


    return (
        <div>
            <h1>Payment</h1>
        </div>
    )
}