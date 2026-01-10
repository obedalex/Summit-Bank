const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    cardName: { type: String, default: "My Card" },

    // eg. 5043 5678 1234 9012
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },

    last4: {
      type: String,
    },

    cardType: {
      type: String,
      enum: ["VISA", "MASTERCARD", "VIRTUAL"],
      default: "VISA",
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    maximumMoney:{
      type:Number,
      default:1000
    },
ledger: [
  {
    type: {
      type: String,
       enum: ["deposit", "withdraw", "investment", "profit", "refund", "transfer-in", "transfer-out"],
    },
    amount: Number,
    reference: String,
    createdAt: { type: Date, default: Date.now },
  }
],

    currency: {
      type: String,
      default: "$",
      uppercase: true,
    },

    status: {
      type: String,
      enum: ["active", "frozen", "blocked",],
      default: "active",
    },

    expMonth: {
      type: Number,
      min: 1,
      max: 12,
    },

    expYear: {
      type: Number,
      min: 2024,
      max: 2050,
    },

    // Store CVV only as hash
    cvvHash: {
      type: String,
      select: false,
    },

    // UI & Preferences
    isDefault: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: "#4456ff",
    },
  },
  { timestamps: true }
);

// ===============================
// AUTO-SET LAST 4 DIGITS
// ===============================
CardSchema.pre("save", function () {
  
  if (this.cardNumber && !this.last4) {
    this.last4 = this.cardNumber.slice(-4);
  }

});

// ===============================
// HASH CVV IF ADDED (local only)
// ===============================
CardSchema.pre("save", async function () {
  if (this.isModified("cvvHash") && this.cvvHash) {
    this.cvvHash = await bcrypt.hash(this.cvvHash, 10);
  }
});


// ===============================
// REMOVE CVV BEFORE RETURNING DOC
// ===============================

// CardSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.cvvHash;
//   return obj;
// };

module.exports = mongoose.model("Card", CardSchema);
