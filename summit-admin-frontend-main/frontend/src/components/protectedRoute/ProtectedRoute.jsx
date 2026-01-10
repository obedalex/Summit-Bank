import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ allowedRoles }) {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setAuthorized(false);
      setChecking(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Role verification
      if (allowedRoles && !allowedRoles.includes(decoded.role)) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    } catch (err) {
      console.log("Invalid token:", err);
      setAuthorized(false);
    }

    setChecking(false);
  }, []);

  // SHOW LOADING WHILE CHECKING TOKEN
  if (checking) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"
        />
      </div>
    );
  }

  // IF NOT AUTHORIZED → REDIRECT TO LOGIN
  if (!authorized) return <Navigate to="/" replace />;

  // AUTHORIZED → RENDER CHILDREN
  return <Outlet />;
}
