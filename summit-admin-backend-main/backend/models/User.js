const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  
  role: { type: String, enum: ["user", "admin"], default: "user" },

  status: {
    type: String,
    enum: ["active", "suspended", "pending"],
    default: "active",
  },

  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },

  lastLogin: { type: Date },

  withdrawPin: {
    type: String, // hashed pin
    default: null,
  },

  // 👇 FIXED: Profile Image now correctly at root level
  profileImage: { type: String, default: null },

}, { timestamps: true });


UserSchema.index({ createdAt: -1 });
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

module.exports = mongoose.model("User", UserSchema);
