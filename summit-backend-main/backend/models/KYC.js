const mongoose = require("mongoose");

const KYCSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  idType: String,  // e.g. Ghana Card
  idNumber: String,
  idFrontImage: String,
  idBackImage: String,
  selfieImage: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
rejectionReason: { type: String },

  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
}, { timestamps: true });

const KYC = mongoose.model("KYC", KYCSchema);
module.exports = KYC