const mongoose = require("mongoose");
 
const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  type: {
    type: String,
    enum: ["deposit", "withdraw", "investment", "payout","bank","card"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },

  amount: { type: Number, required: true },
  paymentMethod: { type: String }, // mobile money, bank, card
  reference: { type: String, unique: true },

  metadata: Object,
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction