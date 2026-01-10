import React from 'react'
import {  useLocation, useNavigate } from "react-router-dom";
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
  Menu
} from "lucide-react";
import { getUserProfile } from '../services/profileService/ProfileService';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
   const loadProfile = async () => {
      const res = await getUserProfile();
      setUser(res.data);
    };

     useEffect(() => {
        loadProfile();
      }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-md border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                {/* mobile menu toggle */}
                <MobileMenu />
                {/* <div className="hidden md:flex items-center gap-3 bg-white border rounded-full px-3 py-1 shadow-sm">
                  <Search size={16} className="text-gray-400" />
                  <input
                    className="w-72 text-sm placeholder-gray-400 focus:outline-none p-2"
                    placeholder="Search transactions, investments..."
                  />
                </div> */}
              </div>

              <div className="flex items-center gap-3">
                {/* <Bell /> 
                <Wallet /> */}
                <div className="flex items-center gap-3 rounded-full bg-white shadow-sm px-3 py-1">
                  <img src={user?.profileImage} alt="me" className="w-8 h-8 rounded-full object-cover" />
                  <div className="hidden sm:flex flex-col text-sm">
                    <span className="font-medium">{user?.fullname}</span>
                    {/* <span className="text-xs text-gray-500">Premium</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
  )
}
function MobileMenu() {
  const navigate = useNavigate();
  return (
    <div className="lg:hidden flex gap-2">
      <button onClick={() => navigate("/")} className="p-2 rounded-md bg-white/5">
        {/* <Menu size={18} className="text-[#1e30fe]" /> */}
        <img src="/logo.png" className="h-8 w-8 rounded-full object-cover"/>

      </button>
      <div className='flex flex-col scale-50 relative right-9 opacity-40 '>
        <p className='text-zinc-950 font-extrabold text-xl'>SUMMIT</p>
        <small className='font-bold text-base'>investment bank</small>

      </div>
    </div>
  );
}