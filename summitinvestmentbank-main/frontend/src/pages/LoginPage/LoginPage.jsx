import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MouseTracker from "../../utils/MouseTracker";
import { registerUser, loginUser } from "../../services/AuthServices/AuthAPI";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

export default function LoginPage() {
  const [mode, setMode] = useState("signin"); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ==========================================
     LOGIN HANDLER
  ========================================== */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed.");
    }

    setLoading(false);
  };

  /* ==========================================
     REGISTER HANDLER
  ========================================== */
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await registerUser({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      });

      alert("Account created successfully!");
      setMode("signin");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex justify-center items-center relative overflow-hidden">
      <MouseTracker />

      {/* Background Video */}
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="https://www.pexels.com/download/video/6942709/" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-[#0E121B]/90" />

      {/* Floating Lights */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#b4a16c33] to-[#ffffff11] blur-3xl"
      />
      <div className="absolute right-[-5%] bottom-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#b4a16c33] to-[#ffffff11] blur-[120px]" />

      {/* HEADER */}
     <NavbarComponent/>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mode === "menu" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 w-full bg-[#121826]/90 p-5 md:hidden z-20"
          >
            {["Personal", "Corporate", "Institutional", "Wealth", "Mail US"].map((item) => (
              <p key={item} className="text-white/80 py-2 uppercase hover:text-[#B4A16C]">
                {item}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-[90%] max-w-6xl grid md:grid-cols-2 gap-10 items-center text-white mt-20">

        {/* LEFT SIDE TEXT */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-light leading-tight">
            Private Banking <br />
            <span className="font-serif text-[#B4A16C]">Redefined</span>
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1 }}
            className="h-[2px] bg-gradient-to-r from-[#B4A16C] to-transparent mt-4"
          />

          <p className="mt-6 text-slate-300 max-w-md">
            Built for investors and high-growth founders to manage wealth.
          </p>

          <button
            onClick={() => setMode("signup")}
            className="mt-8 px-6 py-3 bg-[#B4A16C] rounded-full text-black font-medium shadow-lg"
          >
            Get Started
          </button>
        </motion.div>

        {/* AUTH PANEL */}
        <motion.div layout className="bg-[#121826]/70 p-8 rounded-2xl border border-white/5 shadow-2xl">

          {/* TAB SWITCH */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setMode("signin")}
                className={`px-4 py-2 rounded-full ${
                  mode === "signin" ? "bg-[#B4A16C] text-black" : "text-white/70"
                }`}
              >
                Sign In
              </button>

              <button
                onClick={() => setMode("signup")}
                className={`px-4 py-2 rounded-full ${
                  mode === "signup" ? "bg-[#B4A16C] text-black" : "text-white/70"
                }`}
              >
                Open Account
              </button>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <p className="mb-4 text-center text-red-400 text-sm">{errorMsg}</p>
          )}

          <AnimatePresence mode="wait">
            {/* ================= SIGN IN ================= */}
            {mode === "signin" && (
              <motion.div key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <form onSubmit={handleLogin} className="space-y-5">

                  <InputField
                    icon={<FiMail />}
                    placeholder="Work Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={<FiLock />}
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  <button
                    disabled={loading}
                    className="w-full mt-4 p-3 rounded-xl bg-[#B4A16C] text-black font-semibold"
                  >
                    {loading ? "Signing In..." : "Secure Sign In"}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ================= SIGN UP ================= */}
            {mode === "signup" && (
              <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <form onSubmit={handleRegister} className="space-y-5">

                  <InputField
                    icon={<FiUser />}
                    placeholder="Full Name"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={<FiMail />}
                    placeholder="Work Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={<FiLock />}
                    placeholder="Create Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />

                  <button
                    disabled={loading}
                    className="w-full mt-4 p-3 rounded-xl bg-emerald-500 text-black font-semibold"
                  >
                    {loading ? "Creating Account..." : "Create Summit Account"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

/* ================= INPUT COMPONENT ================= */
function InputField({ icon, placeholder, type = "text", ...rest }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-2.5 text-white/40">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        {...rest}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#B4A16C]/50 transition"
      />
    </div>
  );
}
