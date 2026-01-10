import React, { useEffect, useState } from "react";
import { getKycStatus } from "../../services/kycService/KycAPI";
import { ShieldCheck, Clock, CheckCircle2, XCircle } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import KycShimmerCard from "../shimmerCards/KycShimmerCard";

export default function KycCard() {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await getKycStatus();
      setKyc(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <div className="w-full flex justify-center py-10">
        {/* <ClipLoader size={40} color="#ffffff" /> */}
        <KycShimmerCard/>
      </div>
    );

  if (!kyc)
    return (
      <div className="p-4 text-center text-gray-200">
        No KYC submitted yet.
      </div>
    );

  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* ==== BEAUTIFUL BLUE BANNER BACKGROUND ==== */}
      <div
        className="
          bg-black/90
          text-white shadow-xl rounded-2xl
          p-6 md:p-4 relative overflow-hidden
        "
      >
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-[100px] opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 blur-[90px] opacity-30 -z-10"></div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <ShieldCheck className="text-white" size={26} />
            </div>

            <h2 className="text-sm lg:text-base font-bold tracking-wide">
              Current KYC Verification
            </h2>
          </div>

          <StatusBadge status={kyc.status} />
        </div>

        {/* CONTENT WRAPPER */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* LEFT SIDE - IMAGES */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            <ImageCard title="Front" src={kyc.idFrontImage} />
            <ImageCard title="Back" src={kyc.idBackImage} />
            <ImageCard title="Selfie" src={kyc.selfieImage} />
          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div
            className=" hidden lg:block
              bg-white/10 rounded-xl p-4 backdrop-blur-md
              border border-white/20 min-w-[180px]
            "
          >
            <h3 className="text-sm text-white/90 font-semibold mb-3">
              KYC Info
            </h3>

            <InfoRow label="ID Type" value={kyc.idType} />
            <InfoRow label="ID Number" value={kyc.idNumber} />
            <InfoRow
              label="Submitted"
              value={new Date(kyc.createdAt).toLocaleDateString()}
            />
            <InfoRow
              label="Updated"
              value={new Date(kyc.updatedAt).toLocaleDateString()}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

/* ============================
        COMPONENTS
============================ */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-white/90 text-sm mb-1">
      <span className="opacity-80">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ImageCard({ title, src }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-md border border-white/20 group">
      <img
        src={src}
        alt={title}
        className="w-full h-28 object-cover group-hover:scale-105 transition duration-200"
      />

      <div className="p-1 text-center font-medium text-xs bg-white text-slate-700">
        {title}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: {
      icon: <Clock size={14} />,
      color: "bg-yellow-400 text-slate-900",
      text: "Pending",
    },
    approved: {
      icon: <CheckCircle2 size={14} />,
      color: "bg-green-400 text-slate-900",
      text: "Approved",
    },
    rejected: {
      icon: <XCircle size={14} />,
      color: "bg-red-400 text-white",
      text: "Rejected",
    },
  };

  const current = styles[status] || styles.pending;

  return (
    <div
      className={`
        ${current.color}
        px-3 py-1 rounded-full text-xs font-semibold  
        flex items-center gap-1 shadow-md
      `}
    >
      {current.icon}
      {current.text}
    </div>
  );
}
