import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Landmark, Wallet, KeyRound, Send } from "lucide-react";
import { getUserBankAccounts } from "../../services/bankServices/bankAPI";
import { getWallet } from "../../services/walletServices/WalletAPI";
import { transferBetweenBanksCardsorWallet } from "../../services/TransferServices/TransferAPI";
import { toast } from "react-toastify";

export default function BankToWallet() {
  const [banks, setBanks] = useState([]);
  const [wallet, setWallet] = useState(null);

  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingWallet, setLoadingWallet] = useState(true);

  const [fromBank, setFromBank] = useState(null);
  const [openBank, setOpenBank] = useState(false);

  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [sendLoading, setSendLoading] = useState(false);

  const [pinModal, setPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  /* ===========================
        LOAD BANK ACCOUNTS
  ============================ */
  const loadBanks = async () => {
    try {
      const res = await getUserBankAccounts();
      setBanks(res.data || []);
    } catch (err) {
      toast.error("Failed to load banks");
    } finally {
      setLoadingBanks(false);
    }
  };

  /* ===========================
        LOAD WALLET
  ============================ */
  const loadWallet = async () => {
    try {
      const res = await getWallet();
      setWallet(res.data || null);
    } catch (err) {
      toast.error("Failed to load wallet");
    } finally {
      setLoadingWallet(false);
    }
  };

  useEffect(() => {
    loadBanks();
    loadWallet();
  }, []);

  const handleSend = () => {
    if (!fromBank) return toast.error("Select a bank");
    if (!amount.trim()) return toast.error("Enter amount");

    setPinModal(true);
  };

  /* ===========================
        VALIDATE PIN + SEND
  ============================ */
  const validatePin = async () => {
    setPinLoading(true);
    setPinError("");

    setTimeout(async () => {
      if (pin !== "1234") {
        setPinError("Incorrect PIN");
        setPinLoading(false);
        return;
      }

      setPinModal(false);
      setPinLoading(false);
      setPin("");

      try {
        setSendLoading(true);

        const payload = {
          direction: "bank-to-wallet",
          amount: Number(amount),
          fromBankId: fromBank._id,
          toWalletId: wallet._id,
          memo,
        };

        await transferBetweenBanksCardsorWallet(payload);

        toast.success("Bank → Wallet transfer completed!");

        setTimeout(() => window.location.reload(), 300);
      } catch (err) {
        toast.error(err.response?.data?.message || "Transfer failed");
      } finally {
        setSendLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-5">

      <div className="bg-white/80 shadow-xl border backdrop-blur-xl rounded-2xl p-6 space-y-6">

        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Landmark size={18} /> Bank → Wallet Transfer
        </h2>

        {/* WALLET SUMMARY */}
        {!loadingWallet && wallet && (
          <div className="p-3 bg-gray-50 border rounded-xl">
            <p className="text-xs text-gray-500">Wallet Balance</p>
            <p className="text-lg font-bold">${wallet.balance?.toLocaleString()}</p>
          </div>
        )}

        {/* FROM BANK DROPDOWN */}
        <BankDropdown
          label="From Bank Account"
          icon={<Landmark size={16} />}
          banks={banks}
          selected={fromBank}
          setSelected={setFromBank}
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
            placeholder="Write a note..."
            className="w-full mt-1 bg-gray-50 border rounded-xl p-3 text-xs"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          ></textarea>
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={handleSend}
          disabled={sendLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4456ff] to-[#1e30fe] 
                     text-white font-semibold flex items-center justify-center gap-2
                     hover:scale-[0.99] transition-all disabled:opacity-40"
        >
          {sendLoading ? (
            <ClipLoader size={18} color="white" />
          ) : (
            <>
              <Send size={18} /> Send Money
            </>
          )}
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

      <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
        {icon} {label}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className="mt-1 bg-gray-50 border rounded-xl p-3 cursor-pointer flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img src={selected.bankLogo} className="w-8 h-8 rounded-md border" alt="logo" />
            <div>
              <p className="text-xs font-semibold">{selected.bankName.slice(0, 22)}...</p>
              <p className="text-[10px] text-gray-500">
                {selected.accountNumber} • ${selected.balance}
              </p>
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
            className="absolute w-full z-50 bg-white border rounded-xl shadow-xl mt-2 max-h-64 overflow-y-auto"
          >
            {banks.map((bank) => (
              <div
                key={bank._id}
                onClick={() => {
                  setSelected(bank);
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
              >
                <img src={bank.bankLogo} className="w-8 h-8 rounded-md border" alt="logo" />
                <div>
                  <p className="text-xs font-semibold">{bank.bankName.slice(0, 22)}...</p>
                  <p className="text-[10px] text-gray-500">
                    {bank.accountNumber} • ${bank.balance}
                  </p>
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
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
        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl">

          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <KeyRound size={20} /> Enter PIN
          </h2>

          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 mt-4 text-lg border rounded-xl tracking-widest text-center"
          />

          {pinError && (
            <p className="text-red-600 text-sm mt-2">{pinError}</p>
          )}

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 border rounded-xl font-semibold text-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-gradient-to-r from-[#4456ff] to-[#1e30fe] rounded-xl text-white font-semibold"
            >
              {pinLoading ? <ClipLoader size={18} color="white" /> : "Confirm"}
            </button>
          </div>

        </div>
      </motion.div>
    </>
  );
}
