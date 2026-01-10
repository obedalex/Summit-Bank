

const Notification = require("../../models/Notification.js")

const getNotifications = async (req, res) => {
  const notes = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
};

const markAsRead = async (req, res) => {
  const { id } = req.params;

  await Notification.findByIdAndUpdate(id, { isRead: true });

  res.json({ message: "Notification marked as read" });
};


module.exports = {getNotifications,markAsRead}