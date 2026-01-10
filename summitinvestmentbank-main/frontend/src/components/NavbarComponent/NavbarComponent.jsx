// NavbarComponent.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ContactOverlay from "./ContactOverlay";

export default function NavbarComponent() {
  const [mode, setMode] = useState("signin");
  const [isScrolled, setIsScrolled] = useState(false);

  const [openContact, setOpenContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // MOBILE MENU LINKS
  const mobileLinks = [
    { label: "Personal", url: "/about" },
    // { label: "Corporate", url: "/corporate" },
    // { label: "Institutional", url: "/institutional" },
    { label: "Wealth", url: "/wealth" },
    { label: "Contact Us", action: () => setOpenContact(true) },
        { label: "Open Account", url: "/login-signup" },

  ];

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 w-full px-6 md:px-16 py-4 flex justify-between items-center z-50 
        transition-all duration-500 
        ${isScrolled ? "backdrop-blur-md bg-black/40 border-b border-white/10" : "bg-[#131722]"}`}
      >

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-12 w-12 object-cover rounded-full shadow-lg shadow-black/50 cursor-pointer" onClick={()=>window.location.href="/"} />
          <h2 className="text-white tracking-wider font-light text-xl">
            <span className="font-serif text-[#B4A16C cursor-pointer]" onClick={()=>window.location.href="/"}>Summit</span> Bank
          </h2>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6 text-sm text-white/70">
          {["Personal", "Wealth", "CONTACT US","Open Account"].map((item) => {


 if (item === "Open Account") {
              return (
                <motion.p
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => window.location.href = "/login-signup"}
                  className="uppercase tracking-wide hover:text-[#B4A16C] transition cursor-pointer"
                >
                  {item}
                </motion.p>
              );
            }
            if (item === "Personal") {
              return (
                <motion.p
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => window.location.href = "/about"}
                  className="uppercase tracking-wide hover:text-[#B4A16C] transition cursor-pointer"
                >
                  {item}
                </motion.p>
              );
            }

             if (item === "Wealth") {
              return (
                <motion.p
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => window.location.href = "/wealth"}
                  className="uppercase tracking-wide hover:text-[#B4A16C] transition cursor-pointer"
                >
                  {item}
                </motion.p>
              );
            }

            if (item === "CONTACT US") {
              return (
                <motion.p
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setOpenContact(true)}
                  className="uppercase tracking-wide hover:text-[#B4A16C] transition cursor-pointer"
                >
                  {item}
                </motion.p>
              );
            }

            return (
              <motion.p
                key={item}
                whileHover={{ scale: 1.08 }}
                className="uppercase tracking-wide hover:text-[#B4A16C] transition cursor-pointer"
              >
                {item}
              </motion.p>
            );
          })}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMode(mode === "menu" ? "signin" : "menu")}
            className="text-white/80 p-2 border border-white/20 rounded-lg"
          >
            ☰
          </motion.button>
        </div>
      </header>


      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mode === "menu" && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md pt-15 z-40 flex justify-end"
            onClick={() => setMode("signin")}
          >
            {/* MOBILE MENU PANEL */}
            <motion.div
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-[70%] h-full bg-[#131722] border-l border-white/10 p-6 flex flex-col gap-6"
            >
              {mobileLinks.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10, scale: 1.03 }}
                  className="text-white text-sm tracking-wide cursor-pointer uppercase"
                  onClick={() => {
                    if (item.action) item.action();
                    else window.location.href = item.url;
                    setMode("signin"); // close menu
                  }}
                >
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* CONTACT OVERLAY */}
      <ContactOverlay isOpen={openContact} onClose={() => setOpenContact(false)} />
    </>
  );
}
