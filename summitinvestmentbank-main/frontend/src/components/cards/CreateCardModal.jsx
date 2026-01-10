import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Plus, X } from "lucide-react";
import { createCard } from "../../services/cardServices/CardServiceAPI";
import { toast } from "react-toastify";

export default function CreateCardsModal({ onClose }) {
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("VISA");
  const [color, setColor] = useState("#4A6CF7");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!cardName.trim()) return toast.error("Card name is required");

    setLoading(true);

    try {
      await createCard({ cardName, cardType, color });
      toast.success("Card created successfully!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating card");
    }

    setLoading(false);
  };

  return (
    <>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* MODAL WRAPPER */}
      <motion.div
  className="fixed inset-0 flex items-center justify-center z-[99999] px-4 h-full py-6 lg:my-12 overflow-y-scroll my-6"
  initial={{ opacity: 0, scale: 0.85, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.85, y: 25 }}
  transition={{ duration: 0.25 }}
  onClick={onClose}   // clicking wrapper closes modal
>
  <div
    className="w-full max-w-lg p-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] relative overflow-hidden"
    onClick={(e) => e.stopPropagation()}  // prevent close when clicking inside modal
  >

          
          {/* Soft Gradient Background Decoration */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#6a8dff]/20 via-transparent to-[#1e30fe]/10 blur-[70px]" />

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4456ff]/10 rounded-xl shadow-sm border border-[#4456ff]/20">
                <Plus size={20} className="text-[#4456ff]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Create a New Card
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          {/* 3D Floating Card Preview */}
          <motion.div
            className="rounded-2xl p-5 h-40 text-white shadow-xl mb-6 relative overflow-hidden"
            style={{ background: color }}
            animate={{ backgroundColor: color }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/20 to-transparent"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-90 tracking-wide">{cardType}</span>
              <CreditCard size={26} className="opacity-90" />
            </div>

            <motion.p
              className="text-lg font-semibold mt-6 tracking-wide"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
            >
              {cardName || "Card Name"}
            </motion.p>

            <p className="text-xs opacity-70 mt-2">•••• •••• •••• ••••</p>
          </motion.div>

          {/* FORM FIELDS */}
          <div className="flex flex-col gap-4">

            {/* Card Name */}
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Card Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Enter card name"
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:border-[#4456ff] focus:ring-1 focus:ring-[#4456ff] text-sm"
              />
            </div>

            {/* Card Type */}
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Card Type
              </label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 text-sm focus:ring-1 focus:ring-[#4456ff]"
              >
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="VIRTUAL">VIRTUAL</option>
              </select>
            </div>

            {/* Color Picker */}
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Card Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCreate}
              disabled={loading}
              className="
                w-full py-3 rounded-xl text-white font-semibold
                bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
                transition-all hover:shadow-xl active:scale-95
                disabled:opacity-40
              "
            >
              {loading ? "Creating..." : "Create Card"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
