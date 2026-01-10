// src/ReuseableCards/walletsCards/Cards.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserCards } from "../../services/cardServices/CardServiceAPI";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { getUserProfile } from "../../services/profileService/ProfileService";
import ShimmerCreditCard from "../shimmerCards/ShimmerCard";
import StatShimmerCard from "../shimmerCards/StatShimmerCard";

export default function Cards() {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
 

   const [user, setUser] = useState(null);
     const loadProfile = async () => {
        const res = await getUserProfile();
        setUser(res.data);
      };
  
       useEffect(() => {
          loadProfile();
        }, []);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getUserCards();
      setCards(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed loading cards. Check server."
      );
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="w-full">

      {/* LOADING */}
      {loading && (
        <div className="w-full flex justify-center py-2 gap-4 ">
          {/* <ClipLoader color="#4456ff" size={36} /> */}
          <ShimmerCreditCard/>
          <StatShimmerCard/>
        </div>
      )}

      {/* NO CARDS */}
      {!loading && (!cards || cards.length === 0) && (
        <div className="p-6 text-center text-gray-500 bg-white rounded-xl shadow-sm">
          No cards found. Click Add Card to create one.
        </div>
      )}

      {/* CARDS GRID */}
      {!loading && cards && cards.length > 0 && (
        <>
          {/* Desktop / Tablet: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((c) => (
<CardTile key={c._id} card={c} user={user} />

))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden mt-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 w-[300px] p-4">
              {cards.map((c) => (
                <div key={c._id} className="shrink-0">
                  <CardTile card={c} small user={user} />


                </div>
              ))}
            </div>
          </div>
        </>
      )}

      
    </section>
  );
}

/* ==========================
   CARD TILE (UI)
   ========================== */
function CardTile({ card, user, onOpen, small = false }) {
  // map DB -> UI
  const bankName = card.cardName || "Summit Card";
  const maskedNumber = `•••• •••• •••• ${card.last4 || (card.cardNumber?.slice(-4) ?? "0000")}`;
  const holderName = user?.fullname || "Card Holder";
; // you can swap to real user name if available
  const balance = Number(card.balance || 0).toLocaleString();
  const currency = card.currency || "GHS";
  const type = card.cardType || "VISA";

  const tileHeight = small ? "h-[140px] w-[260px]" : "h-[220px]";

  return (
    <motion.button
      whileHover={{ y: -6 }}
      onClick={onOpen}
      className={`
        relative overflow-hidden rounded-2xl border
        ${small ? "p-3" : "p-5"}
        shadow-[0_18px_45px_rgba(15,23,42,0.25)]
        bg-gradient-to-br from-[#0f1724] via-[#0b1220] to-[#06070a] text-white
        ${tileHeight}
        flex flex-col justify-between
      `}
    >
      {/* subtle glows */}
      <div className="absolute -right-16 -top-10 h-40 w-40 rounded-full bg-[#4456ff]/20 blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-10 h-32 w-32 rounded-full bg-[#1e30fe]/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between z-10">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{type}</p>
          <p className="text-sm font-semibold text-white/95">{bankName}</p>
        </div>

        {/* small logo using uploaded file path */}
        <img
          src="/logo.png"
          alt="logo"
          className="w-10 h-10 rounded-md object-cover border border-white/10"
        />
      </div>

      {/* Middle */}
      <div className="flex flex-col gap-1">
        <p className="text-sm tracking-widest font-mono text-slate-200">{maskedNumber}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-300">
            <div className="uppercase">Card Holder</div>
            <div className="font-medium text-white/90">{holderName}</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-300">Balance</div>
            <div className="text-lg font-semibold">$ {balance}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

