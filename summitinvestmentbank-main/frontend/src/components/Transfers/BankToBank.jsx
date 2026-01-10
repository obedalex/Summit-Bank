import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Landmark,
  ArrowLeftRight,
  KeyRound,
  ChevronDown,
  Send,
} from "lucide-react";
import { getUserBankAccounts } from "../../services/bankServices/bankAPI";
import { toast } from "react-toastify";
import { transferBetweenBanksCardsorWallet } from "../../services/TransferServices/TransferAPI";

export default function BankToBank() {
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const [fromBank, setFromBank] = useState(null);
  const [toBank, setToBank] = useState(null);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [loading, setLoading] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  // Load banks
  const loadBanks = async () => {
    try {
      const res = await getUserBankAccounts();
      setBanks(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingBanks(false);
    }
  };

  useEffect(() => {
    loadBanks();
  }, []);

  const handleSend = () => {
    if (!amount || !fromBank || !toBank) return;
    setPinModal(true);
  };

 /* ===============================
        VALIDATE PIN & SEND TRANSFER
  =============================== */
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
      setPinModal(false);
      setPin("");

      try {
        setLoading(true);

        const res = await transferBetweenBanksCardsorWallet({
          direction: "bank-to-bank",
          amount: Number(amount),
          fromBankId: fromBank._id,
          toBankId: toBank._id,
          memo,
        });

        toast.success("Transfer completed!");
        // console.log("Transfer Response:", res.data);
        setTimeout(()=>{
          window.location.reload()
        },500)

      } catch (err) {
        toast.error(
          err.response?.data?.message || "Transfer failed. Try again."
        );
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-5">
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <ArrowLeftRight size={18} /> Bank → Bank Transfer
        </h2>

        {/* ========================== FROM BANK =========================== */}
        <BankDropdown
          label="From Bank"
          icon={<Landmark size={16} />}
          banks={banks}
          selected={fromBank}
          setSelected={setFromBank}
          open={openFrom}
          setOpen={setOpenFrom}
        />

        {/* ========================== TO BANK ============================= */}
        <BankDropdown
          label="To Bank"
          icon={<Landmark size={16} />}
          banks={banks}
          selected={toBank}
          setSelected={setToBank}
          open={openTo}
          setOpen={setOpenTo}
        />

        {/* ========================== AMOUNT ============================= */}
        <div>
          <label className="text-sm text-gray-700 font-medium">Amount</label>
          <div className="flex items-center border rounded-xl overflow-hidden mt-1">
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

        {/* ========================== MEMO =============================== */}
        <div>
          <label className="text-sm text-gray-700 font-medium">Memo (optional)</label>
          <textarea
            rows={2}
            placeholder="Write a note..."
            className="w-full mt-1 p-3 bg-gray-50 border rounded-xl text-xs"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        {/* ========================== SEND BUTTON ======================== */}
        <button
          onClick={handleSend}
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
            flex items-center justify-center gap-2
            shadow-md hover:scale-[0.99] transition-all disabled:opacity-40
          "
        >
          {loading ? <ClipLoader color="white" size={18} /> : <>
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
            onClose={() => setPinModal(false)}
            onConfirm={validatePin}
            pinLoading={pinLoading}
            pinError={pinError}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   BANK DROPDOWN COMPONENT
============================================================ */
function BankDropdown({ label, icon, banks, selected, setSelected, open, setOpen }) {
  return (
    <div className="relative">
      <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
        {icon} {label}
      </label>

      {/* Main Selector */}
      <div
        onClick={() => setOpen(!open)}
        className="mt-1 bg-gray-50 border rounded-xl p-3 flex items-center justify-between cursor-pointer"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img
              src={selected.bankLogo}
              alt="bank"
              className="w-8 h-8 rounded-md object-contain"
            />
            <div>
              <p className="text-xs font-medium text-gray-900">
                {selected.bankName.slice(0, 20)}...
              </p>
              <p className="text-[10px] text-gray-500">
                {selected.accountNumber} • ${selected.balance}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Select bank</p>
        )}

        <ChevronDown size={16} />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="
              absolute z-50 w-full mt-2 bg-white shadow-xl 
              rounded-xl border max-h-64 overflow-y-auto
            "
          >
            {banks.map((b) => (
              <div
                key={b._id}
                onClick={() => {
                  setSelected(b);
                  setOpen(false);
                }}
                className="
                  p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100
                "
              >
                <img
                  src={b.bankLogo}
                  className="w-8 h-8 rounded object-contain"
                />
                <div>
                  <p className="text-xs font-semibold">{b.bankName.slice(0, 20)}...</p>
                  <p className="text-[10px] text-gray-500">
                    {b.accountNumber} • ${b.balance}
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
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
      >
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <KeyRound size={20} /> Enter PIN to Confirm
          </h2>

          <p className="text-sm text-gray-500 mt-1">Enter your 4-digit PIN.</p>

          <input
            type="password"
            maxLength={4}
            className="
              w-full mt-4 p-3 border rounded-xl text-center 
              tracking-widest text-lg outline-none
            "
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          {pinError && <p className="text-red-600 text-sm mt-2">{pinError}</p>}

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border font-semibold text-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="
                flex-1 py-2 rounded-xl text-white font-semibold
                bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
                flex items-center justify-center
              "
            >
              {pinLoading ? <ClipLoader size={18} color="white" /> : "Confirm"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
