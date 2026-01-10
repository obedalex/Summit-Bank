const mongoose = require("mongoose");

const InvestmentPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  minAmount: Number,
  maxAmount: Number,
  interestRate: Number, // e.g. 10 means 10%
  durationDays: Number, // e.g. 30 days
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const InvestmentPlan = mongoose.model("InvestmentPlan", InvestmentPlanSchema);
module.exports = InvestmentPlan