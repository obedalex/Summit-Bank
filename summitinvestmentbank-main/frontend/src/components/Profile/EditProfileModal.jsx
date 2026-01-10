import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Camera } from "lucide-react";

export default function EditProfileModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.fullname);
  const [phone, setPhone] = useState(user.phone || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user.profileImage);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("fullname", name);
    formData.append("phone", phone);
    if (image) formData.append("userimage", image);

    onSave(formData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* MODAL CARD */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="
          relative w-[90%] max-w-md bg-white/90 backdrop-blur-xl
          rounded-2xl shadow-xl p-6 border border-white/30
          overflow-hidden
        "
      >
        {/* Glow Decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#4456ff]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#1e30fe]/10 rounded-full blur-2xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/40 hover:bg-white/70 transition z-20"
        >
          <X size={20} className="text-slate-700" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Edit Profile
          </h2>

          {/* IMAGE UPLOAD WITH PREVIEW */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={preview || "/default-avatar.png"}
                className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-lg"
                alt="profile"
              />

              {/* Upload icon */}
              <label
                htmlFor="upload"
                className="
                  absolute bottom-1 right-1 bg-[#4456ff] text-white 
                  w-8 h-8 flex items-center justify-center rounded-full 
                  shadow-md cursor-pointer hover:scale-105 transition
                "
              >
                <Camera size={18} />
              </label>

              <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* FORM INPUTS */}
          <div className="flex flex-col gap-3">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl border border-gray-300 
              focus:border-[#4456ff] focus:ring-2 focus:ring-[#4456ff]/40
              transition bg-white/70"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 rounded-xl border border-gray-300 
              focus:border-[#4456ff] focus:ring-2 focus:ring-[#4456ff]/40
              transition bg-white/70"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* ACTION BUTTON */}
            <button
              onClick={handleSubmit}
              className="
                mt-2 w-full py-3 rounded-xl
                bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
                text-white font-semibold shadow-md
                hover:shadow-lg active:scale-95 transition
              "
            >
              Save Changes
            </button>

            <button
              onClick={onClose}
              className="text-gray-600 text-sm py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
