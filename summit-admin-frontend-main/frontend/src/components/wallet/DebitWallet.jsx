import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { debitWallet, getAllWallets } from "../../services/AdminServiceAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { ArrowLeftRight, Wallet } from "lucide-react";

export default function DebitWallet() {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch all wallets
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await getAllWallets(1, 500);
        setWallets(res.data.wallets || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingWallets(false);
      }
    };

    fetchWallets();
  }, []);

  const handleDebit = async (e) => {
    e.preventDefault();

    if (!selectedWallet || !amount) {
      return setMessage({
        type: "error",
        text: "Please select a wallet and enter an amount.",
      });
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = { amount: Number(amount) };
      const res = await debitWallet(selectedWallet, data);

      setMessage({ type: "success", text: res.data.message });
      setAmount("");

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full py-10 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-red-100">
            <ArrowLeftRight size={26} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Debit Wallet</h2>
            <p className="text-gray-500 text-sm">
              Remove funds from any user wallet securely
            </p>
          </div>
        </div>

        {/* Alert */}
        {message.text && (
          <div
            className={`mb-4 rounded-lg p-4 text-sm ${
              message.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleDebit} className="space-y-5">

          {/* Wallet Selector */}
          <div>
            <label className="text-gray-700 font-medium text-sm">Select Wallet</label>

            <div className="relative mt-1">
              <select
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-700"
              >
                <option value="">-- Choose Wallet --</option>

                {loadingWallets ? (
                  <option>Loading...</option>
                ) : wallets.length > 0 ? (
                  wallets.map((w) => (
                    <option key={w._id} value={w._id}>
                      {w.walletName} • {w.walletNumber} • ${w.balance}
                    </option>
                  ))
                ) : (
                  <option>No wallets found</option>
                )}
              </select>

              <Wallet className="absolute top-3 right-3 text-gray-400" size={20} />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-gray-700 font-medium text-sm">
              Amount to Debit
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-lg shadow-md font-semibold flex justify-center items-center gap-2 hover:bg-red-700 transition"
          >
            {loading ? (
              <ClipLoader size={20} color="white" />
            ) : (
              <>
                <ArrowLeftRight size={20} />
                Debit Wallet
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
 