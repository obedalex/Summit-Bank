import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Landmark, CreditCard, Send, KeyRound } from "lucide-react";
import { getUserBankAccounts } from "../../services/bankServices/bankAPI";
import { getUserCards } from "../../services/cardServices/CardServiceAPI";
import { toast } from "react-toastify";
import { transferBetweenBanksCardsorWallet } from "../../services/TransferServices/TransferAPI";

export default function BankToCard() {
  const [banks, setBanks] = useState([]);
  const [cards, setCards] = useState([]);

  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [fromBank, setFromBank] = useState(null);
  const [toCard, setToCard] = useState(null);

  const [openBank, setOpenBank] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [loadSend, setLoadSend] = useState(false);

  const [pinModal, setPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  // Load Banks
  const loadBanks = async () => {
    try {
      const res = await getUserBankAccounts();
      setBanks(res.data || []);
    } catch (err) {
      console.log("Bank load error:", err);
    } finally {
      setLoadingBanks(false);
    }
  };

  // Load Cards
  const loadCards = async () => {
    try {
      const res = await getUserCards();
      setCards(res.data || []);
    } catch (err) {
      console.log("Card load error:", err);
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    loadBanks();
    loadCards();
  }, []);

  const handleSend = () => {
    if (!fromBank || !toCard || !amount) return;
    setPinModal(true);
  };

  /* ===============================
          VALIDATE PIN & SEND TRANSFER
    =============================== */
   const validatePin = () => {
  setPinLoading(true);
  setPinError("");

  setTimeout(async () => {
    // ❌ Wrong PIN
    if (pin !== "1234") {
      setPinError("Incorrect PIN");
      setPinLoading(false);
      return;
    }

    // Close modal
    setPinLoading(false);
    setPinModal(false);
    setPin("");

    try {
      setLoadSend(true); // ⭐ START TRANSFER LOADING

      const res = await transferBetweenBanksCardsorWallet({
        direction: "bank-to-card",
        amount: Number(amount),
        fromBankId: fromBank._id,
        toCardId: toCard._id,
        memo,
      });

      toast.success("Transfer completed!");

      // refresh UI
      setTimeout(() => window.location.reload(), 300);

    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed");
    } finally {
      setLoadSend(false); // ⭐ END TRANSFER LOADING
    }
  }, 1500);
};

  return (
    <div className="w-full max-w-lg mx-auto mt-5">
      <div className="bg-white/80 shadow-xl border border-gray-200 backdrop-blur-xl rounded-2xl p-6 space-y-6">

        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Landmark size={18} /> Bank → Card Transfer
        </h2>

        {/* FROM BANK */}
        <BankDropdown
          label="From Bank Account"
          icon={<Landmark size={16} />}
          banks={banks}
          selected={fromBank}
          setSelected={setFromBank}
          open={openBank}
          setOpen={setOpenBank}
        />

        {/* TO CARD */}
        <CardDropdown
          label="To Card"
          icon={<CreditCard size={16} />}
          cards={cards}
          selected={toCard}
          setSelected={setToCard}
          open={openCard}
          setOpen={setOpenCard}
        />

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 flex items-center border rounded-xl overflow-hidden">
            <span className="px-3 bg-gray-100 text-gray-600 font-medium">
              $
            </span>
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
            className="w-full mt-1 p-3 bg-gray-50 border rounded-xl text-xs"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          ></textarea>
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={handleSend}
          disabled={loadSend}
          className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#4456ff] to-[#1e30fe] 
                     flex items-center justify-center gap-2 hover:scale-[0.99] transition-all disabled:opacity-40">
          {loadSend ? <ClipLoader color="white" size={18} /> : <>
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
   BANK DROPDOWN COMPONENT
============================================================ */
function BankDropdown({ label, icon, banks, selected, setSelected, open, setOpen }) {
  return (
    <div className="relative">

      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon} {label}
      </label>

      {/* SELECTED */}
      <div
        onClick={() => setOpen(!open)}
        className="mt-1 bg-gray-50 border rounded-xl p-3 cursor-pointer flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img
              src={selected.bankLogo}
              className="w-8 h-8 rounded-md border"
              alt="bank logo"
            />
            <div>
              <p className="text-xs font-semibold">
                {selected.bankName.slice(0, 20)}...
              </p>
              <p className="text-[10px] text-gray-500">
                {selected.accountNumber} • ${selected.balance}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Select bank account</p>
        )}
      </div>

      {/* DROPDOWN LIST */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute w-full z-50 bg-white shadow-xl border rounded-xl mt-2 overflow-y-auto max-h-64"
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
                <img
                  src={bank.bankLogo}
                  className="w-8 h-8 rounded-md border"
                  alt="bank logo"
                />
                <div>
                  <p className="text-xs font-semibold">
                    {bank.bankName.slice(0, 20)}...
                  </p>
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
   CARD DROPDOWN COMPONENT
============================================================ */
function CardDropdown({ label, icon, cards, selected, setSelected, open, setOpen }) {
  return (
    <div className="relative">

      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon} {label}
      </label>

      {/* SELECTED CARD */}
      <div
        onClick={() => setOpen(!open)}
        className="mt-1 bg-gray-50 border rounded-xl p-3 cursor-pointer flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-6 rounded-md shadow-sm"
              style={{ backgroundColor: selected.color }}
            ></div>

            <div>
              <p className="text-xs font-semibold">
                {selected.cardName.slice(0, 20)}...
              </p>
              <p className="text-[10px] text-gray-500">
                •••• {selected.last4} • ${selected.balance}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Select card</p>
        )}
      </div>

      {/* DROPDOWN LIST */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute w-full z-50 bg-white shadow-xl border rounded-xl mt-2 overflow-y-auto max-h-64"
          >
            {cards.map((card) => (
              <div
                key={card._id}
                onClick={() => {
                  setSelected(card);
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
              >
                <div
                  className="w-10 h-6 rounded-md shadow-sm"
                  style={{ backgroundColor: card.color }}
                ></div>

                <div>
                  <p className="text-xs font-semibold">
                    {card.cardName.slice(0, 20)}...
                  </p>
                  <p className="text-[10px] text-gray-500">
                    •••• {card.last4} • ${card.balance}
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
   PIN MODAL COMPONENT
============================================================ */
function PinModal({ pin, setPin, onClose, onConfirm, pinLoading, pinError }) {
  return (
    <>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
      >
        <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">

          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <KeyRound size={20} /> Enter PIN to Confirm
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Enter your 4-digit PIN.
          </p>

          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 mt-4 text-center tracking-widest text-lg border rounded-xl"
          />

          {pinError && <p className="text-sm text-red-600 mt-2">{pinError}</p>}

          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 border rounded-xl font-semibold text-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-[#4456ff] to-[#1e30fe]"
            >
              {pinLoading ? <ClipLoader size={18} color="white" /> : "Confirm"}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
