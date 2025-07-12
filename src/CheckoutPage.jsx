import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// ⚠️ Replace this with your real Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          line1: formData.address,
        },
      },
    });

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      setStatus("success");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-4 bg-white/10 text-white p-6 rounded-xl shadow-lg backdrop-blur w-full max-w-xl"
    >
      <h2 className="text-2xl font-bold mb-2">Sealing the Deal</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
        required
      />

      <div className="p-4 rounded bg-zinc-800 border border-zinc-600">
        <CardElement className="text-white" />
      </div>

      <button
        type="submit"
        disabled={!stripe || status === "loading"}
        className="mt-4 px-6 py-3 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-600 transition"
      >
        {status === "loading" ? "Processing..." : "Seal the Deal"}
      </button>

      {status === "success" && (
        <motion.p
          className="text-green-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ Payment successful! You sealed the deal.
        </motion.p>
      )}

      {status === "error" && (
        <p className="text-red-400 mt-4">❌ Something went wrong. Try again.</p>
      )}
    </motion.form>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-6 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <Navbar />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <footer className="h-[10vh] w-full bg-zinc-900 text-gray-400 flex flex-col items-center justify-center text-xs mt-10">
        <p>© {new Date().getFullYear()} CardPlay. All rights reserved.</p>
        <p>123 Innovation Street, Phoenix, AZ • contact@cardplay.com</p>
      </footer>
    </main>
  );
}
