import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Calendar,
  Hash,
  Info,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { getWallet } from "../../../services/walletServices/WalletAPI";

/* ============================================================
   SHIMMER LOADING SKELETON
============================================================ */
function ShimmerTransactionList() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border rounded-xl bg-white shadow-sm p-4 animate-pulse space-y-3"
        >
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   CLEAN REFERENCE
============================================================ */
function cleanReference(reference) {
  if (!reference) return "No reference";
  let cleaned = reference.trim();
  if (cleaned.length > 40) cleaned = cleaned.substring(0, 30) + "...";
  return cleaned;
}

/* ============================================================
   DETAIL ROW
============================================================ */
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center text-xs lg:text-[13px]">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium text-gray-700">{value}</span>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function DashboardTransaction() {
  const [open, setOpen] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const perPage = 5;

  const toggle = (id) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  /* ============================================================
       LOAD WALLET & TRANSACTIONS
  ============================================================ */
  const loadTransactions = async () => {
    try {
      setLoading(true);

      const res = await getWallet();
      const wallet = res.data;

      setTransactions(wallet?.ledger || []);
    } catch (err) {
      console.log("Failed to load transactions:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  if (loading) return <ShimmerTransactionList />;

  if (!transactions.length)
    return (
      <p className="text-center text-gray-500 text-sm">
        No transactions yet.
      </p>
    );

  /* ============================================================
     PAGINATION LOGIC
  ============================================================ */
  const totalPages = Math.ceil(transactions.length / perPage);

  const currentPageTx = transactions.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="w-full space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 tracking-wide border-b pb-2 mt-3">
        Recent Transactions
      </h3>

      {currentPageTx.map((tx) => {
        const isCredit = tx.type === "transfer-in";

        const icon = isCredit ? (
          <ArrowDownCircle size={18} />
        ) : (
          <ArrowUpCircle size={18} />
        );

        const iconBg = isCredit
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600";

        const amountColor = isCredit ? "text-green-600" : "text-red-600";

        const trimmedRef = cleanReference(tx.reference);
        const dateFormatted = new Date(tx.createdAt).toLocaleString();

        return (
          <div key={tx._id} className="rounded-xl bg-white shadow-sm">
            {/* MAIN ROW */}
            <div
              onClick={() => toggle(tx._id)}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${iconBg}`}
                >
                  {icon}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {isCredit ? "Credit" : "Debit"}
                  </span>
                  <span className="text-xs lg:text-[11px] text-gray-500">
                    {trimmedRef}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {dateFormatted}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${amountColor}`}>
                  {isCredit ? "+" : "-"}$
                  {tx.amount.toLocaleString()}
                </span>

                <motion.div
                  animate={{ rotate: open === tx._id ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="text-gray-500" size={18} />
                </motion.div>
              </div>
            </div>

            {/* DETAILS */}
            <AnimatePresence>
              {open === tx._id && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="border-t bg-gray-50 p-4 space-y-3 text-sm"
                >
                  <DetailRow
                    icon={<Hash size={14} />}
                    label="Transaction ID"
                    value={tx._id}
                  />

                  <DetailRow
                    icon={<Info size={14} />}
                    label="Type"
                    value={tx.type.toUpperCase()}
                  />

                  <DetailRow
                    icon={<Info size={14} />}
                    label="Reference"
                    value={trimmedRef}
                  />

                  <DetailRow
                    icon={<Info size={14} />}
                    label="Memo"
                    value={tx.memo || "No memo added"}

                  />

                  <DetailRow
                    icon={<Calendar size={14} />}
                    label="Date"
                    value={dateFormatted}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* ============================================================
         PAGINATION CONTROLS
      ============================================================ */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded-lg text-sm ${
            page === 1
              ? "bg-gray-100 text-gray-400"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Previous
        </button>

        <span className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded-lg text-sm ${
            page === totalPages
              ? "bg-gray-100 text-gray-400"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
