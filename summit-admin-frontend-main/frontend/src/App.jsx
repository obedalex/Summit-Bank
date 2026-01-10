import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Landmark,
  ShieldCheck,
  Users,
  LogOut,
  Menu
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

 const handleLogout = () => {
  localStorage.removeItem("adminToken");   // remove token
  localStorage.removeItem("adminInfo");    // optional: remove stored admin object
  navigate("/");                           // redirect to login page
};


  return (
    <div className="flex w-full min-h-screen bg-gray-100">

      {/* SIDEBAR - DESKTOP */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 bg-[#111827] text-white p-6 flex-col">
        <div className="mb-8 flex gap-2 items-center">
          <img src="/logo.png" className="h-12 w-12 object-cover rounded-full"/>
          <h1 className="text-base font-bold tracking-wide text-[#B4A16C]">
            Summit Admin
          </h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavItem to="/admin/wallets" icon={<Wallet size={18} />} label="Account" />
          {/* <NavItem to="/admin/cards" icon={<CreditCard size={18} />} label="Cards" /> */}
          {/* <NavItem to="/admin/banks" icon={<Landmark size={18} />} label="Banks" /> */}
          {/* <NavItem to="/admin/kyc" icon={<ShieldCheck size={18} />} label="KYC" />
          <NavItem to="/admin/users" icon={<Users size={18} />} label="Users" /> */}
        </nav>

        <div className="mt-4">
          <button className="w-full px-3 py-2 bg-white/10 rounded-lg flex items-center gap-3 text-red-400 hover:bg-white/20" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR */}
      {openSidebar && (
        <div className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
             onClick={() => setOpenSidebar(false)} />
      )}

      <aside className={`lg:hidden fixed inset-y-0 left-0 w-56 bg-[#111827] text-white p-6 flex-col z-50 transform transition-transform duration-200 
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-wide text-[#B4A16C]">
            Summit Admin
          </h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <NavItem to="/admin/wallets" icon={<Wallet size={18} />} label="Account" />
          {/* <NavItem to="/admin/cards" icon={<CreditCard size={18} />} label="Cards" />
          <NavItem to="/admin/banks" icon={<Landmark size={18} />} label="Banks" />
          <NavItem to="/admin/kyc" icon={<ShieldCheck size={18} />} label="KYC" />
          <NavItem to="/admin/users" icon={<Users size={18} />} label="Users" /> */}
        </nav>

        <div className="mt-4">
          <button className="w-full px-3 py-2 bg-white/10 rounded-lg flex items-center gap-3 text-red-400 hover:bg-white/20" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-60 p-6">
        {/* MOBILE TOP BAR */}
        <div className="lg:hidden flex items-center gap-3 mb-4">
          <button
            onClick={() => setOpenSidebar(true)}
            className="p-2 bg-[#111827] text-white rounded-lg"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-lg font-semibold text-gray-800 ">Admin Panel</h1>
        </div>
        
 {/* desktop */}
 {/* <div className="flex items-center justify-center w-full">
  <button className="bg-blue-900 text-white p-3 border rounded-md hover:bg-green-600 cursor-pointer transition-all duration-300" onClick={()=>navigate("/admin/wallets")}>click on button to proceed</button>

 </div> */}
        <Outlet />
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-[#111827] border-t border-gray-700 p-2 shadow-lg z-50">
        <div className="flex justify-between items-center">

          <MobileNavItem to="/admin/wallets" icon={<Wallet size={20} />} label="Wallets" />
          <MobileNavItem to="/admin/cards" icon={<CreditCard size={20} />} label="Cards" />
          <MobileNavItem to="/admin/banks" icon={<Landmark size={20} />} label="Banks" />
          <MobileNavItem to="/admin/kyc" icon={<ShieldCheck size={20} />} label="KYC" />
          <MobileNavItem to="/admin/users" icon={<Users size={20} />} label="Users" />

        </div>
      </nav>

    </div>
  );
}

function NavItem({ to, icon, label }) {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname.startsWith(to);

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(to)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition 
      ${active ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10"}`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </motion.button>
  );
}

function MobileNavItem({ to, icon, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.startsWith(to);

  return (
    <button
      onClick={() => navigate(to)}
      className={`flex flex-col items-center px-3 py-1 ${
        active ? "text-[#B4A16C]" : "text-white"
      }`}
    >
      {icon}
      <span className="text-[10px] mt-1">{label}</span>
    </button>
  );
}
