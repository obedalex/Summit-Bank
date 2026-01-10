const mongoose = require("mongoose");

const CardTransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },

    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer"],
      required: true,
    },

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success",
    },

    reference: { type: String, unique: true },

    metadata: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CardTransaction", CardTransactionSchema);
