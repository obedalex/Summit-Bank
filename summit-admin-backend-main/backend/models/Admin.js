const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["superadmin", "manager", "support"],
    default: "support",
  }
}, { timestamps: true });

// Hash password before saving
// AdminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   // next();
// });

// // Compare password method
// AdminSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model("Admin", AdminSchema);
