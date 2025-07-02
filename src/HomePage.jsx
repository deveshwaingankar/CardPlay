import { useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

export default function HomePage() {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 1.5]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [showModal, setShowModal] = useState(false);

  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory font-sans text-white">

      {/* HERO SECTION */}
      
      <section
        className="snap-start h-screen w-screen flex items-center justify-center relative"
        style={{ backgroundColor: "#D3D3D3" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent)]" />
        </div>

        
        <motion.img
          src="/images/mystery-card.png"
          alt="mystery card"
          className="h-[60vh] w-auto z-10 drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          style={{ scale, opacity }}
        />
      </section>


      {/* HI CARD */}
      <section className="snap-start h-screen w-screen flex flex-col items-center justify-center bg-[#FFFFE0] text-black">
        <motion.img
          src="/images/card-hi.png"
          alt="hi card"
          className="max-h-[50vh] w-auto shadow-xl"
        />
        <p className="mt-4 text-center text-gray-800">Share your hello in a bold way.</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 px-4 py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
        >
          Get Now
        </button>
      </section>

      {/* HELLO CARD */}
      <section className="snap-start h-screen w-screen flex flex-col items-center justify-center bg-[#ffe4e6] text-black">
        <motion.img
          src="/images/card-hello.png"
          alt="hello card"
          className="max-h-[50vh] w-auto shadow-xl"
        />
        <p className="mt-4 text-center text-gray-800">A modern hello for modern times.</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 px-4 py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
        >
          Get Now
        </button>
      </section>

      {/* HONORED CARD */}
      <section className="snap-start h-screen w-screen flex flex-col items-center justify-center bg-[#d1f5e0] text-black">
        <motion.img
          src="/images/card-honored.png"
          alt="honored card"
          className="max-h-[50vh] w-auto shadow-xl"
        />
        <p className="mt-4 text-center text-gray-800">Make a lasting impression.</p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 px-4 py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
        >
          Get Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="snap-start h-screen w-screen flex items-center justify-center text-sm text-gray-600 border-t border-gray-800 bg-black">
        © {new Date().getFullYear()} NFCX. All rights reserved.
      </footer>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-zinc-800 p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Order Your NFC Card</h3>
            <p className="text-gray-400 mb-4">We will reach out to you with options. Fill this in later with a real form.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-4 py-2 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
