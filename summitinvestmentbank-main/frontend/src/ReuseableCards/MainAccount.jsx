import { useEffect, useState } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  SendHorizonal,
} from "lucide-react";
import { getWallet } from "../services/walletServices/WalletAPI";
import ClipLoader from "react-spinners/ClipLoader";
import ShimmerCreditCard from "./shimmerCards/ShimmerCard";
import { useNavigate } from "react-router-dom";

export default function MainAccount() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [showNumber, setShowNumber] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getWallet();
        console.log("main wallet",res.data)
        setWallet(res.data);
      } catch (err) {
        console.log("Wallet load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading || !wallet) {
    return (
      <div className="w-full flex justify-center">
        {/* <ClipLoader size={35} color="#4456ff" /> */}
        <ShimmerCreditCard/>
      </div>
    );
  }

  const maskedNumber =
    "**** **** **** " + wallet.walletNumber.slice(-4);

  const fullFormatted =
    wallet.walletNumber.match(/.{1,4}/g)?.join(" ") || wallet.walletNumber;

  const balance = Number(wallet.balance)?.toLocaleString();

  return (
    <div>
      <div
        className="
        relative w-full rounded-3xl p-5 md:p-6
        bg-[#0d0f24] border border-[#1a1c33]
        shadow-xl overflow-hidden text-white

        h-[200px] sm:h-[170px] lg:h-[200px]
        transition-all duration-300
      "
      >
        {/* Glow Effects */}
        <div className="absolute -top-10 -right-12 w-44 h-44 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* ===== HEADER SECTION ===== */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">
                {wallet.walletName || "Main Wallet"}
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                {wallet.cardholder}
              </p>

              {/* Wallet Number */}
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-gray-300 text-sm tracking-wide">
                  {showNumber ? fullFormatted : maskedNumber}
                </span>

                <button onClick={() => setShowNumber(!showNumber)}>
                  {showNumber ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl shadow">
              <Wallet size={24} className="text-blue-400" />
            </div>
          </div>

          {/* ===== BALANCE SECTION ===== */}
          <div className="flex justify-between items-end w-full">

            <div>
              <p className="text-xs text-gray-400">Current Balance</p>

              <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-3xl font-bold tracking-wide">
                  {showBalance ? `${wallet.currency} ${balance}` : "••••••"}
                </h1>

                <button onClick={() => setShowBalance(!showBalance)}>
                  {showBalance ? (
                    <EyeOff size={18} className="text-gray-300" />
                  ) : (
                    <Eye size={18} className="text-gray-300" />
                  )}
                </button>
              </div>

              {/* Dummy Income / Expense — you can replace with ledger logic */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                  <ArrowDownRight size={16} /> +1,200
                </div>
                <div className="flex items-center gap-1 text-red-400 text-sm font-medium">
                  <ArrowUpRight size={16} /> -550
                </div>
              </div>
            </div>

            {/* Transfer Button */}
            <button
              className="
              bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2
              rounded-xl font-semibold text-sm shadow-lg
              hover:scale-105 transition-transform flex items-center gap-2
            "
            >
              <SendHorizonal size={18} onClick={()=>navigate("/dashboard/transactions")} /> Transfer
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
