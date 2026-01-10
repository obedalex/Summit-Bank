const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  walletName:{
    type:String,
    default:"Summit I.B"
  },
   walletNumber: {
      type: String,
      // required: true,
      trim: true,
      minlength: 6,
      maxlength: 24,
    },
  balance: { type: Number, default: 0 },
  currency:{
    type:String,
    default:"$"
  },
  amountHolder:{
    type:Number,
    
  },
  currentWallets:{
    type:Number,
    max:3,
    min:0
  },
  cardholder:{
 type:String
  },
 limits: {
  maxDailyTransfer: {
    type: Number,
    default: 5000, // you can change this
  },
  maxSingleTransfer: {
    type: Number,
    default: 2000, // you can change this
  }
},
dailyStats: {
  spentToday: {
    type: Number,
    default: 0
  },
  lastReset: {
    type: Date,
    default: new Date()
  }
},


  ledger: [
    {
      type: {
        type: String,
        enum: ["deposit", "withdraw", "investment", "profit", "refund", "transfer-in", "transfer-out","reverse-credit","reverse-debit"],
        
      },
       memo:{
    type:String,
  },
  reversed:{
    type:Boolean,
    default:false
  },
  adminId:{
    type:String,
    default:"admin"
  },
      amount: { type: Number, required: true },
      fee:{type:Number},
      reference: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

      // Store CVV only as hash
    cvvHash: {
      type: String,
      select: false,
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
    status:{
      type:String,
      enum:["frozen","blocked","active","pending"],
      default:"pending"
    }
}, { timestamps: true });



// ===============================
// HASH CVV IF ADDED (local only)
// ===============================
WalletSchema.pre("save", async function () {
  if (this.isModified("cvvHash") && this.cvvHash) {
    this.cvvHash = await bcrypt.hash(this.cvvHash, 10);
  }
});



const Wallet = mongoose.model("Wallet", WalletSchema);



module.exports = Wallet