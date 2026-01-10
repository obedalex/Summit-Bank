const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  message: String,
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification