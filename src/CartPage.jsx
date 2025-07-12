import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Card data
const cards = [
  {
    id: "hi",
    name: "Dosti Card",
    image: "/images/card-hi.png",
    price: 5,
    description:
      "The Hi Card is your instant connection starter. Its bold design helps you make a memorable first impression at any event or meeting.",
  },
  {
    id: "hello",
    name: "Rivaz Card",
    image: "/images/card-hello.png",
    price: 6,
    description:
      "Say hello with style — the Hello Card combines modern looks with advanced NFC technology to connect seamlessly.",
  },
  {
    id: "honored",
    name: "Vyapar Card",
    image: "/images/card-honored.png",
    price: 7,
    description:
      "A respectful, elegant greeting tool — the Honored Card shows appreciation while keeping your details ready to share.",
  },
];

export default function CartPage() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const navigate = useNavigate();

  const taxRate = 0.1;
  const tax = selectedCard.price * taxRate;
  const total = selectedCard.price + tax;

  return (
    <main className="h-screen w-screen overflow-hidden font-sans text-white flex flex-col">
      {/* MAIN BODY */}
      <div className="flex-1 flex justify-center items-center relative">
        {/* BUTTONS SECTION */}
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20"
          // ===> if you want to place these on the RIGHT instead, change:
          // left-4 --> right-4
          // and maybe also adjust transform to translate-x-1/2 if you like
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`px-4 py-3 rounded-xl text-base border transition ${
                selectedCard.id === card.id
                  ? "bg-orange-500 text-black font-bold"
                  : "bg-zinc-800 text-white hover:bg-orange-600"
              }`}
              style={{
                width: "110px", // adjust width of buttons
              }}
            >
              {card.name}
            </button>
          ))}
        </div>

        {/* CARD IMAGE */}
        <motion.img
          src={selectedCard.image}
          alt={selectedCard.name}
          className="h-[80vh] w-auto z-10"
          animate={{
            rotateY: [0, 30, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* OPTIONAL INFO WINDOW
            (new block you requested) 
            this is placed to the right of the card and scales with 40% of its size
        */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 bg-white/10 rounded-xl p-4 backdrop-blur shadow-md"
          style={{
            right: "20%",               // place to the right of the image
            width: "28vw",              // roughly 40% of image size
            maxWidth: "300px",          // limit its max size
            fontSize: "0.9rem",         // readable font
          }}
        >
          <h4 className="text-lg font-bold mb-2">More About This Card</h4>
          <p className="text-xs md:text-sm text-gray-300">
            This area can be used to display extra details, promotions, or a product
            highlight. You can modify its position or styling above easily.
          </p>
        </div>

        {/* ORDER SUMMARY
            you can control position/width below
        */}
        <div
          className="flex flex-col gap-4 bg-white/10 p-4 rounded-xl shadow-lg backdrop-blur text-white absolute right-8 top-1/2 transform -translate-y-1/2"
          style={{
            width: "25vw", // scales with viewport width
            minWidth: "250px",
            maxWidth: "350px",
          }}
        >
          <h3 className="text-xl font-bold">Order Summary</h3>
          <div className="flex justify-between">
            <span>{selectedCard.name}</span>
            <span>${selectedCard.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-400">FREE in Phoenix</span>
          </div>
          <hr className="border-gray-600 my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-2 w-full px-4 py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full text-sm text-orange-400 underline hover:text-orange-500"
          >
            Back to Home
          </button>
          <p className="text-xs text-gray-300 mt-2 italic">{selectedCard.description}</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="h-[10vh] w-full bg-zinc-900 text-gray-400 flex flex-col items-center justify-center text-xs">
        <p>© {new Date().getFullYear()} CardPlay. All rights reserved.</p>
        <p>123 Innovation Street, Phoenix, AZ • contact@cardplay.com</p>
      </footer>
    </main>
  );
}
