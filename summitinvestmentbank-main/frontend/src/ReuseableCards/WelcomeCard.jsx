import { useEffect, useState } from "react";
import { getUserProfile } from "../services/profileService/ProfileService";


export default function WelcomeCard() {
   const [user, setUser] = useState(null);
     const loadProfile = async () => {
        const res = await getUserProfile();
        setUser(res.data);
      };
  
       useEffect(() => {
          loadProfile();
        }, []);
  return (
    
    <div
      className="
      w-full rounded-3xl 
      bg-[#4456ff] 
      text-white 
      p-6 md:p-8 
      shadow-xl 
      relative 
      overflow-hidden
      border border-white/10
    "
    >
      {/* Soft Glow Backgrounds */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 right-5 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Greeting Title */}
        <h1 className="text-[1rem] md:text-[1.4rem] font-semibold tracking-tight">
          Welcome back, <span className="font-bold">{user?.fullname}</span> 👋
        </h1>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-white/90 mt-2 leading-relaxed max-w-md">
          Stay on top of your wallet, track your investments, and manage your financial goals
          effortlessly with Summit Investment Bank.
        </p>

        {/* Decorative Divider */}
        <div className="mt-4 w-16 h-[2.5px] bg-white/40 rounded-full"></div>
      </div>
    </div>
  );
}
