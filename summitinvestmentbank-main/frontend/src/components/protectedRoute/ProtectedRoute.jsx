import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ USER TOKEN

    if (!token) {
      setAuthorized(false);
      setChecking(false);
      return;
    }

    try {
      jwtDecode(token); // just verify it's valid
      setAuthorized(true);
    } catch (err) {
      console.log("Invalid token:", err);
      setAuthorized(false);
    }

    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-black">
        <motion.div
          className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"
        />
      </div>
    );
  }

  if (!authorized) return <Navigate to="/login-signup" replace />;

  return <Outlet />;
}
