import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Users,
  Loader2,
} from "lucide-react";
import { getAllUsers, createWallet } from "../../services/AdminServiceAPI";

export default function CreateWallet() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [balance, setBalance] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [cvv, setCvv] = useState("");

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [creating, setCreating] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  /* ======================================================
        LOAD ALL USERS
  ====================================================== */
  const loadUsers = async () => {
    try {
      setLoadingUsers(true);

      const res = await getAllUsers();   // <-- FIXED
      setUsers(res.data.data || []);     // users array (not single)

    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to load users",
      });
    }
    setLoadingUsers(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ======================================================
        HANDLE CREATE WALLET
  ====================================================== */
  const handleCreateWallet = async (e) => {
    e.preventDefault();

    if (!selectedUser || !balance || !cardholder || !cvv) {
      return setMessage({
        type: "error",
        text: "All fields are required",
      });
    }

    setCreating(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await createWallet({
        userId: selectedUser,   // <-- FIXED (required)
        balance,
        cardholder,
        cvvHash: cvv,
      });

      setMessage({
        type: "success",
        text: "Wallet created successfully!",
      });

      // Reset form
      setBalance("");
      setCardholder("");
      setCvv("");
      setSelectedUser("");

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Creation failed",
      });
    }

    setCreating(false);
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <CreditCard size={28} className="text-gray-800" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Summit Wallet
        </h2>
      </div>

      {/* ALERT */}
      {message.text && (
        <div
          className={`mb-5 p-4 rounded-xl border ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-green-100 text-green-700 border-green-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl border"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
          <Users size={20} className="text-gray-700" />
          Wallet Details
        </h3>

        {loadingUsers ? (
          <div className="flex justify-center py-10">
            <Loader2 size={30} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <form onSubmit={handleCreateWallet} className="space-y-6">

            {/* USER SELECT */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                Select User
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="
                  w-full p-3 rounded-lg bg-gray-50 border outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              >
                <option value="">-- Select User --</option>

                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.fullname} — {u.email}
                  </option>
                ))}
              </select>
            </div>

            {/* BALANCE */}
            <InputField
              label="Initial Balance"
              placeholder="$0.00"
              type="number"
              value={balance}
              onChange={setBalance}
            />

            {/* CARDHOLDER */}
            <InputField
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardholder}
              onChange={setCardholder}
            />

            {/* CVV */}
            <InputField
              label="Security Code (CVV)"
              placeholder="123"
              type="number"
              value={cvv}
              onChange={setCvv}
            />

            {/* SUBMIT */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              disabled={creating}
              className="
                w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-blue-600 to-blue-700
                shadow-md hover:shadow-lg transition
                disabled:opacity-40
              "
            >
              {creating ? (
                <Loader2 size={18} className="animate-spin mx-auto" />
              ) : (
                "Create Wallet"
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

/* ========================================================
      REUSABLE INPUT COMPONENT
======================================================== */
function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-700 font-medium mb-1 block">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full p-3 rounded-lg bg-gray-50 border outline-none
          focus:ring-2 focus:ring-blue-500
        "
      />
    </div>
  );
}
