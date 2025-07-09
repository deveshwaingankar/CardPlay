// src/CheckoutPage.jsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// Stripe publishable key
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXX");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [data, setData] = useState({
    email: "",
    address: "",
    shipping: "standard",
  });
  const [phase, setPhase] = useState("form");
  const [clientSecret, setClientSecret] = useState("");

  const shippingCost = data.shipping === "express" ? 500 : 0; // in cents

  const totalCents = 500 + shippingCost; // e.g. $5 + shipping

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhase("creating");

    // 1️⃣ Call serverless endpoint
    const resp = await fetch("/.netlify/functions/stripeCreateIntent", {
      method: "POST",
      body: JSON.stringify({ amount: totalCents }),
    });
    const { clientSecret } = await resp.json();
    setClientSecret(clientSecret);
    setPhase("processing");

    // 2️⃣ Confirm payment
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email: data.email },
      },
    });

    if (error) {
      console.error(error);
      setPhase("error");
    } else setPhase("success");
  };

  // Loading spinner
  if (phase === "creating" || phase === "processing") {
    return (
      <div className="text-white text-center p-6">
        <p>Processing payment...</p>
      </div>
    );
  }

  // Success animation
  if (phase === "success") {
    return (
      <motion.div
        className="bg-white/10 max-w-lg mx-auto p-8 rounded-xl backdrop-blur shadow-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-3xl font-bold text-green-300 mb-4">
          🎉 Payment Successful!
        </h2>
        <p>Your card has been sealed in our system. Thank you!</p>
        <button
          onClick={() => window.location.assign("/")}
          className="mt-6 px-6 py-3 bg-orange-500 text-black rounded-xl hover:bg-orange-600"
        >
          Return Home
        </button>
      </motion.div>
    );
  }

  // Form
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white/10 max-w-lg mx-auto p-6 rounded-xl backdrop-blur shadow-lg text-white space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold">Sealing the Deal</h2>

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        value={data.email}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-zinc-900 rounded border border-zinc-700 focus:ring-2 focus:ring-orange-400"
      />

      <textarea
        name="address"
        placeholder="Shipping Address"
        required
        value={data.address}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-zinc-900 rounded border border-zinc-700 focus:ring-2 focus:ring-orange-400"
        rows={2}
      />

      <select
        name="shipping"
        value={data.shipping}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-zinc-900 rounded border border-zinc-700 focus:ring-2 focus:ring-orange-400"
      >
        <option value="standard">Standard Shipping (Free)</option>
        <option value="express">Express Shipping (+$5)</option>
      </select>

      <div className="p-3 bg-white rounded">
        <CardElement options={{ style: { base: { color: "#000" } } }} />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full py-3 bg-orange-500 text-black rounded-xl hover:bg-orange-600 font-bold"
      >
        Pay ${(totalCents / 100).toFixed(2)}
      </button>
    </motion.form>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen pt-24 px-4 flex flex-col items-center bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </main>
  );
}
