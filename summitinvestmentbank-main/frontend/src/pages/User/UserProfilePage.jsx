import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import EditProfileModal from "../../components/Profile/EditProfileModal";
import PinSection from "../../components/Profile/PinSection";
import {
  getUserProfile,
  updateUserProfile,
  updatePin,
} from "../../services/profileService/ProfileService";
import { toast } from "react-toastify";
import KycCard from "../../ReuseableCards/KycCards/KycCard";
import KycShimmerCard from "../../ReuseableCards/shimmerCards/KycShimmerCard";
import ProfileShimmerCard from "../../ReuseableCards/shimmerCards/ProfileShimmerCard";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const loadProfile = async () => {
    const res = await getUserProfile();
    setUser(res.data);
  };

  const saveProfile = async (formData) => {
    await updateUserProfile(formData);
    await loadProfile();
    setEditing(false);
  };

  const savePin = async (payload) => {
  try {
    const res = await updatePin(payload);

    toast.success(res.data?.msg || "PIN updated successfully");
    await loadProfile();

  } catch (err) {
    toast.error(
      err?.response?.data?.msg ||
      err?.response?.data?.error ||
      "Failed to update PIN"
    );
  }
};


  useEffect(() => {
    loadProfile();
  }, []);

  if (!user)
    return <div className="p-6 text-center text-gray-600 flex flex-co gap-4">
      <KycShimmerCard/>
      <ProfileShimmerCard/>

    </div>;

  const hasPin = Boolean(user.withdrawPin);

  return (
    <div
      className="
        w-full lg:max-w-4xl mx-auto lg:px-4 py-6 mb-12 lg:mb-0
        flex flex-col gap-6
        relative
      "
    >
      {/* kyc cards */}
      <KycCard/>
      {/* Decorative glows */}
      <div className="absolute top-0 right-10 w-52 h-52 bg-[#4456ff]/20 blur-[80px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-10 w-40 h-40 bg-[#1e30fe]/20 blur-[70px] rounded-full -z-10"></div>

      <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

      <ProfileHeader user={user} onEdit={() => setEditing(true)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit ">

        {/* LEFT: Account Details */}
        <div
          className="
            bg-white/90 backdrop-blur-xl border border-gray-200 
            p-6 rounded-2xl shadow-xl relative overflow-hidden
          "
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Account Information
          </h2>

          <div className="flex flex-col gap-3 text-sm">
            <InfoRow label="Full Name" value={user.fullname} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Phone" value={user.phone || "Not set"} />
            <InfoRow label="Role" value={user.role} />
          </div>
        </div>

        {/* RIGHT: PIN SECTION */}
        <PinSection onSetPin={savePin} hasPin />
      </div>

      {editing && (
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
          onSave={saveProfile}
        />
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
