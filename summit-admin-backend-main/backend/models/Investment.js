const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "InvestmentPlan", required: true },

  amount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active"
  },

  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },

  expectedReturn: Number,
  actualReturn: Number
}, { timestamps: true });

const Investment = mongoose.model("Investment", InvestmentSchema);
module.exports = Investment