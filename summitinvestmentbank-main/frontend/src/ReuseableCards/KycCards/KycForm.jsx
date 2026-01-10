// src/components/kyc/KycForm.jsx
import React, { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { toast } from "react-toastify";
import useFilePreview from "../../KYCHooks/useFilePreview";
import { submitKYC } from "../../services/kycService/KycAPI";

// Logo path from your uploaded asset (developer-provided)
const LOGO_PATH = "/logo.png";

export default function KycForm() {
  const [idType, setIdType] = useState("Ghana Card");
  const [idNumber, setIdNumber] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const frontPreview = useFilePreview(frontFile);
  const backPreview = useFilePreview(backFile);
  const selfiePreview = useFilePreview(selfieFile);

  const resetForm = () => {
    setIdType("Ghana Card");
    setIdNumber("");
    setFrontFile(null);
    setBackFile(null);
    setSelfieFile(null);
    setProgress(0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!idNumber || !frontFile || !selfieFile) {
      return toast.error("ID number, ID front and selfie are required.");
    }

    // small client-side validation
    const maxMB = 8;
    const allFiles = [frontFile, backFile, selfieFile].filter(Boolean);
    for (const f of allFiles) {
      if (f.size / 1024 / 1024 > maxMB) {
        return toast.error(`Each file must be < ${maxMB}MB`);
      }
      if (!f.type.startsWith("image/")) {
        return toast.error("Only image files are allowed.");
      }
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("idType", idType);
      fd.append("idNumber", idNumber);
      // match backend expected field names
      fd.append("idFrontImage", frontFile);
      if (backFile) fd.append("idBackImage", backFile);
      fd.append("selfieImage", selfieFile);

      await submitKYC(fd, (evt) => {
        if (evt.total) {
          const pct = Math.round((evt.loaded / evt.total) * 100);
          setProgress(pct);
        }
      });

      toast.success("KYC submitted. We will review and update you shortly.");
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  // Small reusable file drop / preview control
  function FileDrop({ label, file, onChange, preview, required = false }) {
    return (
      <label className="block">
        <div
          className={`w-full h-36 rounded-lg border border-dashed flex items-center justify-center cursor-pointer overflow-hidden bg-white ${
            required ? "ring-1 ring-yellow-200" : ""
          }`}
        >
          {preview ? (
            <div className="relative w-full h-full">
              <img src={preview} alt={label} className="object-contain w-full h-full" />
              <button
                type="button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  onChange(null);
                }}
                className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-sm text-gray-600">
              <UploadCloud size={28} />
              <div className="mt-2 font-medium">{label}</div>
              <div className="text-xs text-gray-400 mt-1">PNG, JPG · up to 8MB</div>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img src={LOGO_PATH} alt="Summit" className="w-12 h-12 object-cover rounded-md" />
        <div>
          <div className="text-lg font-semibold">KYC Verification</div>
          <div className="text-sm text-gray-500">Upload your ID and a selfie to verify your account.</div>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">ID Type</label>
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            {/* <option>Ghana Card</option> */}
            <option>Passport</option>
            <option>Voter ID</option>
            <option>Driver License</option>
            <option>National ID</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            ID Number
          </label>
          <input
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="e.g. CO-1234-5678"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-2">Upload images</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FileDrop
              label="ID Front (required)"
              file={frontFile}
              onChange={setFrontFile}
              preview={frontPreview}
              required
            />
            <FileDrop
              label="ID Back (optional)"
              file={backFile}
              onChange={setBackFile}
              preview={backPreview}
            />
            <FileDrop
              label="Selfie with ID (required)"
              file={selfieFile}
              onChange={setSelfieFile}
              preview={selfiePreview}
              required
            />
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {progress > 0 ? <span>Uploading: {progress}%</span> : <span>Images are stored securely.</span>}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="py-2 px-4 rounded-lg border"
            disabled={loading}
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 rounded-lg bg-[#4456ff] text-white font-semibold text-sm"
          >
            {loading ? "Submitting…" : "Submit KYC"}
          </button>
        </div>
      </div>
    </form>
  );
}
