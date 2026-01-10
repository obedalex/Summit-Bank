import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Landmark, CreditCard, Send, KeyRound } from "lucide-react";

import { getUserBankAccounts } from "../../services/bankServices/bankAPI";
import { getWallet } from "../../services/walletServices/WalletAPI";
import { transferBetweenBanksCardsorWallet } from "../../services/TransferServices/TransferAPI";
import { toast } from "react-toastify";

export default function WalletToBank() {
  const [banks, setBanks] = useState([]);
  const [wallet, setWallet] = useState(null);

  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingWallet, setLoadingWallet] = useState(true);

  const [selectedBank, setSelectedBank] = useState(null);
  const [openBank, setOpenBank] = useState(false);

  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [sendLoading, setSendLoading] = useState(false);

  const [pinModal, setPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  /* LOAD BANK ACCOUNTS */
  const loadBanks = async () => {
    try {
      const res = await getUserBankAccounts();
      setBanks(res.data || []);
    } catch (err) {
      console.log("Bank load error:", err);
      toast.error("Failed to load bank accounts");
    } finally {
      setLoadingBanks(false);
    }
  };

  /* LOAD WALLET */
  const loadWallet = async () => {
    try {
      const res = await getWallet();
      setWallet(res.data || null);
    } catch (err) {
      console.log("Wallet load error:", err);
      toast.error("Failed to load wallet");
    } finally {
      setLoadingWallet(false);
    }
  };

  useEffect(() => {
    loadBanks();
    loadWallet();
  }, []);

  /* OPEN PIN MODAL */
  const handleSend = () => {
    if (!selectedBank) return toast.error("Select a bank account");
    if (!amount.trim()) return toast.error("Enter an amount");

    setPinModal(true);
  };

  /* VALIDATE PIN AND SEND TRANSFER */
  const validatePin = () => {
    setPinLoading(true);
    setPinError("");

    setTimeout(async () => {
      if (pin !== "1234") {
        setPinError("Incorrect PIN");
        setPinLoading(false);
        return;
      }

      setPinLoading(false);
      setPin("");
      setPinModal(false);

      try {
        setSendLoading(true);

        const payload = {
          direction: "wallet-to-bank",
          amount: Number(amount),
          toBankId: selectedBank._id,
          memo,
        };

        const res = await transferBetweenBanksCardsorWallet(payload);

        toast.success("Wallet → Bank transfer successful!");

        setTimeout(() => {
          window.location.reload();
        }, 300);
      } catch (err) {
        toast.error(err.message || "Transfer failed");
      } finally {
        setSendLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-5">
      <div className="bg-white/80 shadow-xl border border-gray-200 backdrop-blur-xl rounded-2xl p-6 space-y-6">

        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <CreditCard size={18} /> Wallet → Bank Transfer
        </h2>

        {/* SHOW WALLET */}
        {!loadingWallet && wallet && (
          <div className="p-3 border bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Wallet Balance</p>
            <p className="font-semibold text-lg">
              ${wallet.balance?.toLocaleString()}
            </p>
          </div>
        )}

        {/* BANK DROPDOWN */}
        <BankDropdown
          label="Select Bank Account"
          icon={<Landmark size={16} />}
          banks={banks}
          selected={selectedBank}
          setSelected={setSelectedBank}
          open={openBank}
          setOpen={setOpenBank}
        />

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 flex items-center border rounded-xl overflow-hidden">
            <span className="px-3 bg-gray-100 text-gray-600 font-medium">$</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full p-3 text-sm outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* MEMO */}
        <div>
          <label className="text-sm font-medium text-gray-700">Memo (optional)</label>
          <textarea
            rows={2}
            className="w-full mt-1 p-3 bg-gray-50 border rounded-xl text-xs"
            placeholder="Write a note..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={handleSend}
          disabled={sendLoading}
          className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
                     flex items-center justify-center gap-2 hover:scale-[0.99] transition-all disabled:opacity-40"
        >
          {sendLoading ? <ClipLoader color="white" size={18} /> : <>
            <Send size={18} /> Send Money
          </>}
        </button>
      </div>

      {/* PIN MODAL */}
      <AnimatePresence>
        {pinModal && (
          <PinModal
            pin={pin}
            setPin={setPin}
            pinError={pinError}
            pinLoading={pinLoading}
            onClose={() => setPinModal(false)}
            onConfirm={validatePin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   BANK DROPDOWN
============================================================ */
function BankDropdown({ label, icon, banks, selected, setSelected, open, setOpen }) {
  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon} {label}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className="mt-1 bg-gray-50 border rounded-xl p-3 cursor-pointer flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img src={selected.bankLogo} className="w-8 h-8 rounded-md border" />
            <div>
              <p className="text-xs font-semibold">{selected.bankName.slice(0, 20)}...</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Select bank</p>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute w-full mt-2 z-50 bg-white shadow-xl border rounded-xl max-h-64 overflow-y-auto"
          >
            {banks.map((bank) => (
              <div
                key={bank._id}
                onClick={() => {
                  setSelected(bank);
                  setOpen(false);
                }}
                className="p-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer"
              >
                <img src={bank.bankLogo} className="w-8 h-8 rounded-md border" />
                <div>
                  <p className="text-xs font-semibold">{bank.bankName.slice(0, 20)}...</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   PIN MODAL
============================================================ */
function PinModal({ pin, setPin, onClose, onConfirm, pinLoading, pinError }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <KeyRound size={20} /> Enter PIN to Confirm
          </h2>

          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full mt-4 p-3 text-center border rounded-xl tracking-widest text-lg"
          />

          {pinError && (
            <p className="text-sm text-red-600 mt-2 text-center">{pinError}</p>
          )}

          <div className="mt-5 flex gap-3">
            <button onClick={onClose} className="flex-1 py-2 border rounded-xl text-gray-700">
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 py-2 rounded-xl text-white bg-gradient-to-r from-[#4456ff] to-[#1e30fe]"
            >
              {pinLoading ? <ClipLoader size={18} color="white" /> : "Confirm"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
