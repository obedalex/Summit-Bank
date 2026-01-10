// models/BankAccount.js
const mongoose = require("mongoose");

const BankAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Bank Details
    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    accountName: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 20,
    },

    country: {
      type: String,
      required: true,
      default: "United States",
    },

    currency: {
      type: String,
      default: "USD",   // 💰 Now in dollars
      uppercase: true,
    },

    bankCode: {
      type: String,
      default: null, // routing number (optional)
    },
 bankLogo: {
      type: String, // Cloudinary URL, local URL, or CDN URL
      required: true,
    },
    // Verification Status
    status: {
      type: String,
      enum: ["pending", "verified", "failed"],
      default: "pending",
    },
swiftCode: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Ledger (optional, for withdrawals/deposits)
    ledger: [
      {
        type: {
          type: String,
           enum: ["deposit", "withdraw", "investment", "profit", "refund", "transfer-in", "transfer-out"],
          required: true,
        },
        amount: { type: Number, required: true },
        reference: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);



module.exports = mongoose.model("BankAccount", BankAccountSchema);
