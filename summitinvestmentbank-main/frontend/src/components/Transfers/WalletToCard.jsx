import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Wallet, CreditCard, Send, KeyRound } from "lucide-react";
import { getWallet } from "../../services/walletServices/WalletAPI";
import { getUserCards } from "../../services/cardServices/CardServiceAPI";
import { transferBetweenBanksCardsorWallet } from "../../services/TransferServices/TransferAPI";
import { toast } from "react-toastify";

export default function WalletToCard() {
  const [wallet, setWallet] = useState(null);
  const [cards, setCards] = useState([]);

  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [toCard, setToCard] = useState(null);
  const [openCard, setOpenCard] = useState(false);

  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [sendLoading, setSendLoading] = useState(false);

  const [pinModal, setPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  /* =================================
        LOAD WALLET
  ================================= */
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

  /* =================================
        LOAD CARDS
  ================================= */
  const loadCards = async () => {
    try {
      const res = await getUserCards();
      setCards(res.data || []);
    } catch (err) {
      toast.error("Failed to load cards");
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    loadWallet();
    loadCards();
  }, []);

  /* =================================
        OPEN PIN POPUP
  ================================= */
  const handleSend = () => {
    if (!toCard) return toast.error("Select a card");
    if (!amount.trim()) return toast.error("Enter amount");

    setPinModal(true);
  };

  /* =================================
      VALIDATE PIN & SEND TRANSFER
  ================================= */
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
          direction: "wallet-to-card",
          amount: Number(amount),
          fromWalletId: wallet._id,
          toCardId: toCard._id,
          memo,
        };

        await transferBetweenBanksCardsorWallet(payload);

        toast.success("Wallet → Card transfer successful!");

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
      <div className="bg-white/80 border backdrop-blur-xl rounded-2xl shadow-xl p-6 space-y-6">

        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Wallet size={18} /> Wallet → Card Transfer
        </h2>

        {/* WALLET SUMMARY */}
        {!loadingWallet && wallet && (
          <div className="p-3 border bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Wallet Balance</p>
            <p className="text-lg font-bold">${wallet.balance?.toLocaleString()}</p>
          </div>
        )}

        {/* TO CARD DROPDOWN */}
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
          <div className="flex items-center border rounded-xl overflow-hidden mt-1">
            <span className="bg-gray-100 px-3 text-gray-600 font-medium">$</span>
            <input
              type="number"
              className="w-full p-3 text-sm outline-none"
              placeholder="0.00"
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
            className="w-full mt-1 bg-gray-50 border rounded-xl p-3 text-xs"
            placeholder="Write a note..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
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
            pinLoading={pinLoading}
            pinError={pinError}
            onClose={() => setPinModal(false)}
            onConfirm={validatePin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* =====================================================================
   CARD DROPDOWN
===================================================================== */
function CardDropdown({ label, icon, cards, selected, setSelected, open, setOpen }) {
  return (
    <div className="relative">

      <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
        {icon} {label}
      </label>

      <div
        onClick={() => setOpen(!open)}
        className="mt-1 p-3 bg-gray-50 border rounded-xl cursor-pointer flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-6 rounded-md shadow-sm"
              style={{ backgroundColor: selected.color }}
            />
            <div>
              <p className="text-xs font-semibold">{selected.cardName.slice(0, 20)}...</p>
              <p className="text-[10px] text-gray-500">
                •••• {selected.last4} • ${selected.balance}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Select card</p>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-xl max-h-64 overflow-y-auto"
          >
            {cards.map((card) => (
              <div
                key={card._id}
                onClick={() => {
                  setSelected(card);
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div
                  className="w-10 h-6 rounded-md shadow-sm"
                  style={{ backgroundColor: card.color }}
                />
                <div>
                  <p className="text-xs font-semibold">{card.cardName.slice(0, 20)}...</p>
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

/* =====================================================================
   PIN MODAL
===================================================================== */
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
        <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl">

          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <KeyRound size={20} /> Enter PIN
          </h2>

          <input
            type="password"
            maxLength={4}
            className="w-full p-3 mt-4 text-center text-lg border rounded-xl tracking-widest"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
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
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#4456ff] to-[#1e30fe] text-white font-semibold"
            >
              {pinLoading ? <ClipLoader size={18} color="white" /> : "Confirm"}
            </button>
          </div>

        </div>
      </motion.div>
    </>
  );
}
