const cloudinary = require("../../config/cloudinary.config");
const crypto = require("crypto");
const KYC = require("../../models/KYC");
const { uploadToCloudinary } = require("../../utils/uploadToCloudinary");

// Correct SHA1 hash for deduplication
const hashBuffer = (buffer) => {
  return crypto.createHash("sha1").update(buffer).digest("hex");
};

const uploadImageWithHash = async (file, folder) => {
  if (!file) return null;

  const fileHash = hashBuffer(file.buffer);

  // Search Cloudinary for existing image with same hash
  const searchResult = await cloudinary.search
    .expression(`resource_type:image AND folder=${folder} AND context.fileHash=${fileHash}`)
    .execute();

  if (searchResult.total_count > 0) {
    return searchResult.resources[0].secure_url;
  }

  // Upload new image
  const uploaded = await uploadToCloudinary(file.buffer, folder, { fileHash });
  return uploaded.secure_url;
};

// ===============================
// UPSERT KYC (only one per user)
// ===============================
const submitKYC = async (req, res) => {
  try {
    const { idType, idNumber } = req.body;

    const existingKyc = await KYC.findOne({ userId: req.user.id });

    const idFrontUrl = await uploadImageWithHash(req.files?.idFrontImage?.[0], "kyc/id_front");
    const idBackUrl = await uploadImageWithHash(req.files?.idBackImage?.[0], "kyc/id_back");
    const selfieUrl = await uploadImageWithHash(req.files?.selfieImage?.[0], "kyc/selfie");

    let payload = {
      idType,
      idNumber,
    };

    if (idFrontUrl) payload.idFrontImage = idFrontUrl;
    if (idBackUrl) payload.idBackImage = idBackUrl;
    if (selfieUrl) payload.selfieImage = selfieUrl;

    let kyc;

    if (existingKyc) {
      kyc = await KYC.findOneAndUpdate(
        { userId: req.user.id },
        { $set: payload },
        { new: true }
      );
    } else {
      kyc = await KYC.create({
        userId: req.user.id,
        ...payload,
      });
    }

    res.json({
      message: existingKyc ? "KYC updated successfully" : "KYC submitted successfully",
      kyc,
    });

  } catch (err) {
    console.error("KYC ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get KYC
const getKYCStatus = async (req, res) => {
  try {
    const kyc = await KYC.findOne({ userId: req.user.id });
    res.json(kyc);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitKYC, getKYCStatus };
