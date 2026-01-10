import React, { useState } from "react";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function PinSection({ hasPin = false, onSetPin }) {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const pinsMatch =
    newPin.length === 4 &&
    confirmPin.length === 4 &&
    newPin === confirmPin;

  const canSubmit = hasPin
    ? oldPin.length === 4 && pinsMatch
    : pinsMatch;

  const handleSubmit = () => {
    if (!pinsMatch) {
      return toast.error("New PIN and Confirm PIN do not match");
    }

    if (hasPin && oldPin.length !== 4) {
      return toast.error("Enter your old 4-digit PIN");
    }

    const payload = hasPin
      ? { oldPin, newPin }
      : { pin: newPin };

    onSetPin(payload);
  };

  return (
    <div
      className="
        bg-white/90 backdrop-blur-xl 
        border border-gray-200 
        p-6 rounded-2xl shadow-xl 
        mt-6 relative overflow-hidden
      "
    >
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#4456ff]/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#1e30fe]/10 rounded-full blur-xl"></div>

      <div className="relative z-10 flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-[#4456ff]/10 border border-[#4456ff]/20">
          <Shield className="text-[#4456ff]" size={22} />
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          {hasPin ? "Change Withdrawal PIN" : "Set Withdrawal PIN"}
        </h2>
      </div>

      {/* Old PIN */}
      {hasPin && (
        <PinInput
          icon={<Lock />}
          placeholder="Enter Old PIN"
          value={oldPin}
          setValue={setOldPin}
          show={showOld}
          setShow={setShowOld}
        />
      )}

      {/* New PIN */}
      <PinInput
        icon={<Lock />}
        placeholder={hasPin ? "Enter New PIN" : "Enter 4-digit PIN"}
        value={newPin}
        setValue={setNewPin}
        show={showNew}
        setShow={setShowNew}
      />

      {/* Confirm PIN */}
      <PinInput
        icon={<Lock />}
        placeholder="Confirm PIN"
        value={confirmPin}
        setValue={setConfirmPin}
        show={showConfirm}
        setShow={setShowConfirm}
      />

      {confirmPin.length === 4 && newPin !== confirmPin && (
        <p className="text-red-500 text-xs mb-2">PINs do not match</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="
          mt-2 w-full py-3 rounded-xl 
          bg-gradient-to-r from-[#4456ff] to-[#1e30fe]
          text-white font-semibold
          shadow-lg hover:shadow-xl 
          active:scale-95 
          transition-all
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        {hasPin ? "Update PIN" : "Save PIN"}
      </button>
    </div>
  );
}

function PinInput({ icon, placeholder, value, setValue, show, setShow }) {
  return (
    <div className="relative mb-4">
      <span className="absolute top-3 left-3 text-gray-400">{icon}</span>

      <input
        type={show ? "text" : "password"}
        maxLength={4}
        placeholder={placeholder}
        className="
          w-full p-3 pl-10 pr-10 rounded-xl 
          border border-gray-300
          focus:border-[#4456ff] focus:ring-2 focus:ring-[#4456ff]/50
          transition-all text-sm
        "
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute top-3 right-3 text-gray-500"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
