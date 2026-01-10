const mongoose = require("mongoose");

const BankListSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    bankLogo: {
      type: String, // Cloudinary URL, local URL, or CDN URL
      required: true,
    },
    country: {
   type: String,
   default: "USA"
},
swiftCode: String,
routingNumber: String,

  },
  
  { timestamps: true }
);

module.exports = mongoose.model("BankList", BankListSchema);
