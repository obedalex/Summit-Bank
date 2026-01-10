import { useState, useEffect } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  PlusCircle,
  SendHorizonal,
  ArrowDownCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { getWallet } from "../../services/walletServices/WalletAPI";
import ShimmerCreditCard from "../shimmerCards/ShimmerCard";

export default function MainWallet() {
  const [wallet, setWallet] = useState(null);
  const [showNumber, setShowNumber] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getWallet();
        setWallet(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, []);

  if (!wallet) return
  (
    <div className="flex w-full items-center justify-center">
<ShimmerCreditCard />
    </div>
  )
  

  const maskedNumber = "**** **** **** " + wallet.walletNumber.slice(-4);

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      
      {/* ================= CARD ================= */}
      <motion.div
        className="relative rounded-3xl p-6 
        bg-gradient-to-br from-gray-900 via-black to-gray-950
        border border-gray-700 shadow-xl overflow-hidden
        text-white
        h-[240px] md:h-[240px] lg:h-[260px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Decorative Circles */}
        <div className="absolute -top-14 -right-16 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-10 w-44 h-44 bg-purple-500/30 rounded-full blur-2xl" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold tracking-wide">{wallet.walletName}</h2>
              <p className="text-sm text-gray-400 mt-1">{wallet.cardholder}</p>

              <div className="flex items-center gap-2 mt-2 ">
                <span className="font-mono  tracking-widest text-sm">
                  {showNumber ? wallet.walletNumber : maskedNumber}
                </span>
                <button onClick={() => setShowNumber(!showNumber)}>
                  {showNumber ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-md">
              <Wallet size={26} className="text-blue-400" />
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 tracking-wider">CURRENT BALANCE</p>
            <div className="flex items-center gap-2 mt-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                {showBalance ? `${wallet.currency} ${wallet.balance.toLocaleString()}` : "••••••"}
              </h1>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* TOGGLE BUTTON */}
        {/* <div className="text-center absolute bottom-2 left-1/2 -translate-x-1/2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenActions((prev) => !prev)}
            className="text-sm text-gray-300 flex items-center gap-2"
          >
            <span className="text-xs">Tap to manage wallet</span>
            {openActions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </motion.button>
        </div> */}
      </motion.div>

      {/* ================= ACTIONS BELOW CARD ================= */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={openActions ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center"
      >
        <div className="flex gap-4 p-4 bg-black/60 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-md">
          <ActionButton icon={<PlusCircle size={20} />} label="Add" onClick={() => console.log("Add money")} />
          <ActionButton icon={<SendHorizonal size={20} />} label="Transfer" onClick={() => console.log("Transfer")} />
          <ActionButton icon={<ArrowDownCircle size={20} />} label="Withdraw" onClick={() => console.log("Withdraw")} />
        </div>
      </motion.div>
    
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center
        bg-white/10 backdrop-blur-xl border border-gray-700 
        shadow-md rounded-xl px-4 py-3
        text-xs font-medium text-gray-200"
    >
      <div className="mb-1 text-blue-400">{icon}</div>
      {label}
    </motion.button>
  );
}
