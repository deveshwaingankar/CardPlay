import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false); // close the drawer after click
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md flex justify-between items-center px-6 py-4">
        <button
          onClick={() => handleNavClick("/")}
          className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] bg-clip-text text-transparent hover:from-orange-400 hover:to-yellow-300 transition"
        >
          CardPlay
        </button>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-orange-500 transition"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 bg-zinc-900 text-white rounded-xl shadow-lg p-6 z-40"
          >
            <ul className="space-y-3 text-lg">
              <li>
                <button onClick={() => handleNavClick("/")} className="hover:text-orange-500 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("/cart")} className="hover:text-orange-500 transition">
                  Cart
                </button>
              </li>
              <li>
                <button onClick={() => alert("Add contact section or route")} className="hover:text-orange-500 transition">
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
