const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  details: Object,
  ip: String
}, { timestamps: true });

const AuditLog = mongoose.model("AuditLog", AuditLogSchema);
module.exports = AuditLog