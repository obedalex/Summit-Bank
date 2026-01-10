// ContactOverlay.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ContactOverlay({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    const { name, email, message } = form;

    // Simple validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Name, email and message are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "info@summitinvestmentglobal.com",
          ...form,
        }),
      });

      setLoading(false);

      if (res.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
        onClose();
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-lg flex justify-center items-center z-[999] p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* CARD */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-[#151923]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-xl p-8 relative"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={22} />
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                className="h-12 w-12 rounded-full shadow-md"
                alt="Summit Logo"
              />
              <h2 className="text-xl md:text-2xl text-white font-light tracking-wide">
                <span className="font-serif text-[#B4A16C]">Summit</span> Investment Global
              </h2>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Fill in your details and our team will get back to you shortly.
            </p>

            {/* GRID INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
                className="bg-black/20 text-white p-3 rounded-xl border border-white/10 focus:border-[#B4A16C] outline-none transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={form.email}
                onChange={handleChange}
                className="bg-black/20 text-white p-3 rounded-xl border border-white/10 focus:border-[#B4A16C] outline-none transition"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number (optional)"
                value={form.phone}
                onChange={handleChange}
                className="bg-black/20 text-white p-3 rounded-xl border border-white/10 focus:border-[#B4A16C] outline-none transition md:col-span-2"
              />
            </div>

            {/* MESSAGE TEXTAREA */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message *"
              className="w-full bg-black/20 text-white p-4 rounded-xl h-32 outline-none border border-white/10 mt-4 focus:border-[#B4A16C] transition"
            />

            {/* SEND BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="mt-6 w-full py-3 rounded-xl bg-[#B4A16C] text-black font-semibold tracking-wide hover:bg-[#d1c08a] transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
