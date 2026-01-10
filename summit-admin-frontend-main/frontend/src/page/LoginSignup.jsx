import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { adminLogin, createAdmin } from "../services/AuthServices/AuthAPI";

export default function LoginSignup() {
  const [mode, setMode] = useState("login"); // login | signup

  return (
    <main className="min-h-screen bg-zinc-900 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-md 
          bg-white/5 backdrop-blur-xl 
          rounded-2xl shadow-xl border border-white/10 
          p-8 space-y-6 text-white
        "
      >
        {/* LOGO */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <img src="/logo.png" alt="logo" className="w-16 h-16 object-contain" />
          <h1 className="text-lg font-semibold tracking-wide text-white/80">
            Summit Admin Portal
          </h1>
        </div>

        {/* Toggle Buttons */}
        <div className="grid grid-cols-2 bg-white/10 p-1 rounded-xl w-full">
          <button
            onClick={() => setMode("login")}
            className={`w-full py-2 rounded-lg text-sm font-medium transition ${
              mode === "login" ? "bg-white/20" : "text-white/60"
            }`}
          >
            Login
          </button>

          {/* <button
            onClick={() => setMode("signup")}
            className={`py-2 rounded-lg text-sm font-medium transition ${
              mode === "signup" ? "bg-white/20" : "text-white/60"
            }`}
          >
            Create Admin
          </button> */}
        </div>

        {/* FORM */}
        <AnimatePresence mode="wait">
          {mode === "login" ? <LoginForm key="login" /> : <SignupForm key="signup" />}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

/* ============================================================
   LOGIN FORM
============================================================ */
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setMsg({ type: "error", text: "All fields are required" });
    }

    try {
      setLoading(true);
      setMsg({ type: "", text: "" });

      const res = await adminLogin({ email, password });
      localStorage.setItem("adminToken", res.data.token);
      setTimeout(()=>{
        window.location.href="/admin"
      },2000)

      setMsg({ type: "success", text: "Login successful! Redirecting..." });


      // TODO: redirect to admin dashboard
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.msg || "Login failed",
      });
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* ALERT */}
      {msg.text && (
        <div
          className={`text-xs p-2 rounded-md ${
            msg.type === "error"
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-green-500/20 text-green-300 border border-green-500/30"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Email */}
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        icon={<Mail size={16} className="text-white/50" />}
      />

      {/* Password */}
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        icon={<Lock size={16} className="text-white/50" />}
      />

      {/* Login Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="
          w-full py-3 bg-blue-600 hover:bg-blue-700 
          rounded-xl font-semibold text-sm 
          transition flex items-center justify-center gap-2 disabled:opacity-40
        "
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : "Login"}
        {!loading && <ArrowRight size={16} />}
      </motion.button>

      <p className="text-center text-xs text-white/50">
        Secure access for admin users only.
      </p>
    </motion.form>
  );
}

/* ============================================================
   SIGNUP FORM
============================================================ */
// function SignupForm() {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("support");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [msg, setMsg] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       return setMsg({ type: "error", text: "All fields are required" });
//     }

//     try {
//       setLoading(true);
//       setMsg({ type: "", text: "" });

//       const res = await createAdmin({ name, email, password, role });

//       setMsg({ type: "success", text: "Admin created successfully!" });

//       // Optionally reset fields
//       setName("");
//       setEmail("");
//       setPassword("");
//       setRole("support");
//     } catch (err) {
//       setMsg({
//         type: "error",
//         text: err.response?.data?.msg || "Failed to create admin",
//       });
//     }

//     setLoading(false);
//   };

//   return (
//     <motion.form
//       onSubmit={handleSignup}
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -15 }}
//       transition={{ duration: 0.35 }}
//       className="space-y-5"
//     >
//       {/* ALERT */}
//       {msg.text && (
//         <div
//           className={`text-xs p-2 rounded-md ${
//             msg.type === "error"
//               ? "bg-red-500/20 text-red-300 border border-red-500/30"
//               : "bg-green-500/20 text-green-300 border border-green-500/30"
//           }`}
//         >
//           {msg.text}
//         </div>
//       )}

//       {/* Admin Name */}
//       <InputField
//         label="Full Name"
//         value={name}
//         onChange={setName}
//         icon={<User size={16} className="text-white/50" />}
//       />

//       {/* Email */}
//       <InputField
//         label="Email"
//         type="email"
//         value={email}
//         onChange={setEmail}
//         icon={<Mail size={16} className="text-white/50" />}
//       />

//       {/* Password */}
//       <InputField
//         label="Password"
//         type="password"
//         value={password}
//         onChange={setPassword}
//         icon={<Lock size={16} className="text-white/50" />}
//       />

//       {/* Role */}
//       <div className="space-y-2">
//         <label className="text-xs text-white/60">Role</label>
//         <div className="bg-white/5 border border-white/10 rounded-lg p-2">
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full bg-transparent text-sm outline-none text-white"
//           >
//             <option className="text-black">support</option>
//             <option className="text-black">manager</option>
//             <option className="text-black">superadmin</option>
//           </select>
//         </div>
//       </div>

//       {/* Button */}
//       <motion.button
//         whileTap={{ scale: 0.97 }}
//         disabled={loading}
//         className="
//           w-full py-3 bg-green-600 hover:bg-green-700 
//           rounded-xl font-semibold text-sm 
//           transition flex items-center justify-center gap-2 disabled:opacity-40
//         "
//       >
//         {loading ? <Loader2 size={18} className="animate-spin" /> : "Create Admin"}
//         {!loading && <ShieldCheck size={16} />}
//       </motion.button>

//       <p className="text-center text-xs text-white/50">
//         New admins require superadmin approval.
//       </p>
//     </motion.form>
//   );
// }

/* ============================================================
   REUSABLE INPUT FIELD
============================================================ */
function InputField({ label, type = "text", icon, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-white/60">{label}</label>

      <div
        className="
          flex items-center gap-2 
          bg-white/5 border border-white/10 
          rounded-lg px-3 py-2
          focus-within:border-blue-400
        "
      >
        {icon}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            bg-transparent w-full text-sm 
            outline-none text-white placeholder-white/40
          "
          placeholder={label}
        />
      </div>
    </div>
  );
}
