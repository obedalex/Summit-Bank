import React from "react";
import { Pencil } from "lucide-react";

export default function ProfileHeader({ user, onEdit }) {
  return (
    <div
      className="
        bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
        p-6 rounded-2xl shadow-xl
        flex items-center gap-5 relative overflow-hidden
        text-white
      "
    >
      {/* Soft glass glow */}
      <div className="absolute right-0 top-0 w-40 h-40 bg-white/20 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute left-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-xl opacity-40"></div>

      {/* PROFILE IMAGE */}
      <img
        src={user.profileImage || "/default-avatar.png"}
        alt="profile"
        className="
          w-20 h-20 rounded-full object-cover border-4 border-white/40 shadow-lg
        "
      />

      {/* USER INFO */}
      <div className="flex-1 relative z-10">
        <h2 className="text-xl font-semibold tracking-wide">
          {user.fullname || "Unnamed User"}
        </h2>
        <p className="text-white/90 text-sm mt-1">
          {user.email}
        </p>
      </div>

      {/* EDIT BUTTON */}
      <button
        onClick={onEdit}
        className="
          p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30
          hover:bg-white/30 active:scale-95 transition-all shadow-md
        "
      >
        <Pencil size={18} className="text-white" />
      </button>
    </div>
  );
}
