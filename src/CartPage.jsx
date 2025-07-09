import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const cards = [
  {
    id: "hi",
    name: "Hi Card",
    image: "/images/yellow-card.png",
    price: 5,
    description: "Make a bold introduction at any event.",
  },
  {
    id: "hello",
    name: "Hello Card",
    image: "/images/purple-card.png",
    price: 6,
    description: "Say hello in style with seamless NFC sharing.",
  },
  {
    id: "honored",
    name: "Honored Card",
    image: "/images/green-card.png",
    price: 7,
    description: "Show gratitude with a premium greeting.",
  },
];

export default function CartPage() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const taxRate = 0.1;
  const promoDiscount = promoCode.toLowerCase() === "save10" ? 0.1 : 0;
  const subtotal = selectedCard.price * quantity;
  const discount = subtotal * promoDiscount;
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;

  return (
    <main className="h-screen w-screen overflow-hidden text-white font-sans bg-[url('/images/bg-grid.png')] bg-cover bg-center bg-no-repeat flex flex-col">
      <div className="flex-1 w-full flex justify-center items-center px-6">
        <div className="flex flex-row gap-10 items-center justify-center w-full max-w-7xl">

          {/* LEFT: CARD SELECTOR */}
          <div className="flex flex-col gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`px-4 py-2 rounded-xl text-sm sm:text-base border transition w-[120px]
                  ${
                    selectedCard.id === card.id
                      ? "bg-orange-500 text-black font-bold"
                      : "bg-zinc-800 text-white hover:bg-orange-600"
                  }`}
              >
                {card.name}
              </button>
            ))}
          </div>

          {/* MIDDLE: CARD IMAGE */}
          <motion.img
            key={selectedCard.id}
            src={selectedCard.image}
            alt={selectedCard.name}
            className="h-[65vh] max-w-[300px] object-contain drop-shadow-2xl"
            animate={{ rotateY: [15, -15, 15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* RIGHT: DESCRIPTION */}
          <div className="hidden lg:block w-[240px] bg-white/10 p-4 rounded-xl backdrop-blur shadow">
            <h4 className="text-lg font-semibold mb-2">About the Card</h4>
            <p className="text-sm text-gray-300">{selectedCard.description}</p>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white/10 backdrop-blur p-5 rounded-xl w-[300px] shadow-xl flex flex-col gap-4">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="flex justify-between">
              <span>Price</span>
              <span>${selectedCard.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Quantity</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 py-1 bg-zinc-700 rounded hover:bg-orange-600">-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 bg-zinc-700 rounded hover:bg-orange-600">+</button>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Promo (-10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>Delivery</span>
              <span>FREE in Phoenix</span>
            </div>
            <hr className="border-gray-500" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="px-3 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 text-sm"
            />

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-orange-400 underline hover:text-orange-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="h-[10vh] w-full bg-zinc-900 text-gray-400 flex flex-col items-center justify-center text-xs px-4">
        <p>© {new Date().getFullYear()} CardPlay. All rights reserved.</p>
        <p>123 Innovation Street, Phoenix, AZ • contact@cardplay.com</p>
      </footer>
    </main>
  );
}
