import { useState, useEffect } from "react";
import { motion, useAnimation, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

export default function CardShowcase() {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 1.5]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth font-sans text-white no-scrollbar">  
      {/* NAV */}
      <Navbar />

      {/* BACKGROUND WRAPPER */}
      {/* <div className="relative z-50 bg-red-500 text-black p-10">
        <h1>This should show up!</h1>
      </div> */}
      <div className="bg-transparent min-h-screen">
        {/* HERO */}
        <section className="w-screen h-screen snap-start flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 " />
          <motion.img
            src="/images/king-front.png"
            alt="Mystery Card"
            style={{ scale, opacity }}
            className="h-[60vh] w-auto z-20 drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          />
        </section>

        {/* CARDS SECTION */}
        <section
          ref={ref}
          className="w-screen h-screen snap-start flex flex-col items-center justify-center relative"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center z-10"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { staggerChildren: 0.3, delayChildren: 0.3 }
              },
            }}
          >
            {/* HI CARD */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex flex-col items-center">
              <img src="/images/card-hi.png" className="h-[60vh] w-auto shadow-xl" alt="Hi Card" />
              <p className="mt-4 text-center text-gray-200">Share your hello in a bold way.</p>
            </motion.div>
            {/* HELLO CARD */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex flex-col items-center">
              <img src="/images/card-hello.png" className="h-[60vh] w-auto shadow-xl" alt="Hello Card" />
              <p className="mt-4 text-center text-gray-200">A modern hello for modern times.</p>
            </motion.div>
            {/* HONORED CARD */}
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex flex-col items-center">
              <img src="/images/card-honored.png" className="h-[60vh] w-auto shadow-xl" alt="Honored Card" />
              <p className="mt-4 text-center text-gray-200">Make a lasting impression.</p>
            </motion.div>
          </motion.div>

          <button
            onClick={() => navigate("/cart")}
            className="mt-10 px-6 py-3 bg-orange-500 text-black rounded-xl hover:bg-orange-600 transition z-20"
          >
            Get Now
          </button>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="w-screen h-[20vh] snap-start bg-black text-gray-400 flex flex-col items-center justify-center space-y-2 text-sm">
        <p>© {new Date().getFullYear()} CardPlay. All rights reserved.</p>
        <p>123 Innovation Street, Phoenix, AZ</p>
        <p>contact@cardplay.com</p>
      </footer>
    </main>
  );
}
