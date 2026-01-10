import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Calendar,
  Hash,
  User,
  CheckCircle,
} from "lucide-react";
import { getUserCards } from "../../../services/cardServices/CardServiceAPI";

/* ============================================================
   SHIMMER LOADING
============================================================ */
function ShimmerCard() {
  return (
    <div className="border rounded-xl bg-white p-4 shadow-sm animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function DashboardCards() {
  const [activeCard, setActiveCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleCard = (id) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  /* ============================================================
     LOAD REAL USER CARDS
  ============================================================ */
  const loadCards = async () => {
    try {
      setLoading(true);
      const res = await getUserCards();
      setCards(res.data); // Backend returns array
    } catch (err) {
      console.log("Failed to fetch cards:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </div>
    );
  }

  if (!cards.length) {
    return (
      <p className="text-center text-gray-500 text-sm">
        You have no active cards.
      </p>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* HEADER */}
      <h3 className="text-sm font-semibold text-gray-700 tracking-wide border-b pb-2">
        Your Summit Cards
      </h3>

      {cards.map((card) => (
        <div
          key={card._id}
          className=" rounded-xl overflow-hidden bg-white shadow-sm"
        >
          {/* CARD ITEM */}
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => toggleCard(card._id)}
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                className="w-10 h-10 rounded-md object-cover shadow"
                alt="bank"
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">{card.cardType}</span>
                <span className="text-sm font-medium">{card.cardName}</span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <motion.div
              animate={{ rotate: activeCard === card._id ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={20} className="text-gray-600" />
            </motion.div>
          </div>

          {/* EXPANDED DETAILS */}
          <AnimatePresence>
            {activeCard === card._id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-50 p-4 border-t space-y-3"
              >
                {/* Card Number */}
                <DetailRow
                  icon={<Hash size={14} />}
                  label="Card Number"
                  value={`**** **** **** ${card.last4}`}
                />

                {/* Type */}
                <DetailRow
                  icon={<CreditCard size={14} />}
                  label="Card Type"
                  value={card.cardType}
                />

                {/* Status */}
                <DetailRow
                  icon={<CheckCircle size={14} />}
                  label="Status"
                  value={card.status.toUpperCase()}
                />

                {/* Expiry */}
                <DetailRow
                  icon={<Calendar size={14} />}
                  label="Created"
                  value={new Date(card.createdAt).toLocaleDateString()}
                />

                {/* Holder */}
                <DetailRow
                  icon={<User size={14} />}
                  label="Cardholder"
                  value={card.userId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   REUSABLE DETAIL ROW
============================================================ */
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center text-[13px]">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
