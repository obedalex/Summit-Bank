// models/AdminConfig.js
const mongoose = require("mongoose");

const AdminConfigSchema = new mongoose.Schema({
  maxWalletBalance: { type: Number, default: 5000 }, // starting limit
  tierReduction: { type: Number, default: 0.3 },     // 30% wallet size reduction
});

module.exports = mongoose.model("AdminConfig", AdminConfigSchema);
 
