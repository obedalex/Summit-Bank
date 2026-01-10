import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  User,
  Bell,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Search,
  LogOut,
  Menu,
  UserLockIcon
} from "lucide-react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";



export default function App() {
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate("/login-signup")
  }
  const navigate = useNavigate()
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-slate-800">

      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* SIDEBAR - desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-56 z-50">
        <div className="flex h-full flex-col bg-[#131722] text-white shadow-2xl rounded-tr-2xl rounded-br-2xl p-6">
          {/* logo + title */}
          <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-12 w-12 object-cover rounded-full shadow-lg shadow-black/50" />
          <h2 className="text-white tracking-wider font-light text-BASE">
            <span className="font-serif text-[#B4A16C]">Summit</span> Bank
          </h2>
        </div>

          {/* nav */}
          <nav className="flex-1 flex flex-col gap-2 mt-4">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem to="/dashboard/wallet" icon={<Wallet size={20} />} label="Wallet" />
            <NavItem to="/dashboard/transactions" icon={<CreditCard size={20} />} label="Transactions" />
            <NavItem to="/dashboard/account" icon={<UserLockIcon size={20} />} label="Accounts" />
            
            {/* <NavItem to="/investments" icon={<BarChart3 size={20} />} label="Investments" /> */}
            <NavItem to="/dashboard/kyc" icon={<ShieldCheck size={20} />} label="KYC" />
            {/* <NavItem to="/notifications" icon={<Bell size={20} />} label="Notifications" /> */}
            <NavItem to="/dashboard/profile" icon={<User size={20} />} label="Profile" />
          </nav>

          {/* footer small */}
          <div className="mt-6">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white bg-opacity-[10%] hover:bg-opacity-20 transition text-sm text-red-700" onClick={handleLogout}>
              <LogOut size={16}  color="black"/> Sign out
            </button>
          </div>
        </div>
      </aside>
   

      {/* RIGHT: main content */}
      {/* RIGHT: main content */}
<div className="flex-1 lg:ml-46 bg-gray-200">

  <Header />

  {/* Routed Screen */}
  <div className="px-4 py-4">
    <Outlet />
  </div>

</div>

      {/* mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-1 z-50 w-full px-2">
        <div className="bg-[#131722] backdrop-blur-sm border border-[#32353d] border-3 rounded-3xl shadow-lg px-4 py-2 flex justify-between items-center">
          <MobileNavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Home" />
          <MobileNavItem to="/dashboard/wallet" icon={<Wallet size={20} />} label="Wallet" />
          <div className="relative -top-4">
            <button className="w-14 h-14 rounded-full bg-[#4456ff] text-white shadow-lg flex items-center justify-center" onClick={()=>navigate("/dashboard/kyc")}>+</button>
          </div>
          <MobileNavItem to="/dashboard/transactions" icon={<CreditCard size={20} />} label="Txns" />
          <MobileNavItem to="/dashboard/account" icon={<UserLockIcon size={20} />} label="Acc" />
          <MobileNavItem to="/dashboard/profile" icon={<User size={20} />} label="Profile" />
        </div>
      </nav>

    </div>
  );
}

/* ---------- small components ---------- */

function NavItem({ to, icon, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.button
      onClick={() => navigate(to)}
      whileTap={{ scale: 0.98 }}
      className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
        ${isActive ? "bg-white/20 ring-1 ring-white/30" : "hover:bg-white/10"}
      `}
    >
      <div className={`p-2 rounded-md ${isActive ? "bg-white/10" : ""}`}>
        <span className={`text-white ${isActive ? "opacity-100" : "opacity-90"}`}>{icon}</span>
      </div>
      <div className="text-sm font-medium text-white">{label}</div>
    </motion.button>
  );
}




function MobileNavItem({ to, icon, label }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;

  return (
    <div onClick={() => navigate(to)} className={`flex flex-col items-center gap-1 px-2 py-1 ${isActive ? "text-[#4456ff]" : "text-white"}`}>
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}
