import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const favoriteUsers = [
  { id: 1, name: "Michael", img: "https://i.pravatar.cc/150?img=12" },
  // { id: 2, name: "Sandra", img: "https://i.pravatar.cc/150?img=14" },
  // { id: 3, name: "Kwame", img: "https://i.pravatar.cc/150?img=24" },
  { id: 2, name: "Jennifer", img: "https://i.pravatar.cc/150?img=30" },
  { id: 3, name: "Tamara", img: "https://i.pravatar.cc/150?img=3" },
];
 
export default function QuickSend() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!amount || !pin) return;
    alert(`GHS ${amount} successfully sent to ${selectedUser.name}!`);
    setSelectedUser(null);
    setAmount("");
    setPin("");
  };

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold text-black mb-3">
        Quick Send
      </h2>

      {/* Scrollable favorite users */}
      <div className=" mt-3 overflow-x-auto overflow-y-hidden scrollbar-hide">
                <div className="flex gap-4 w-80 lg:w-full md:w-full px-1">

        {favoriteUsers.map((user) => (
          <motion.button
            key={user.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedUser(user)}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg ring-2 ring-slate-700">
              <img src={user.img} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <p className="text-xs text-blue-500 font-medium">{user.name}</p>
          </motion.button>
        ))}
      </div>
      </div>

      {/* Send Modal */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="w-full max-w-sm bg-slate-900/90 border border-slate-700 rounded-2xl p-5 shadow-lg">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={selectedUser.img} className="h-10 w-10 rounded-full" />
                    <div>
                      <p className="text-sm text-slate-200 font-medium">
                        Send Money To:
                      </p>
                      <p className="text-lg font-semibold text-slate-100">
                        {selectedUser.name}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedUser(null)}
                    className="text-slate-400 hover:text-slate-200 text-xl px-2"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleSend} className="space-y-4">

                  <div>
                    <label className="text-xs text-slate-300">Amount ($)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300">Enter PIN</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="****"
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 tracking-[0.5em] outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    disabled={!amount || !pin}
                    className="w-full rounded-lg px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-slate-100 font-semibold disabled:bg-slate-600 disabled:cursor-not-allowed"
                  >
                    Send Money
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}


