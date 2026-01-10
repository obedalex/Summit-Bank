const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  code: String,
  type: { type: String, enum: ["email", "phone", "reset"] },
  expiresAt: { type: Date }
}, { timestamps: true });

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP