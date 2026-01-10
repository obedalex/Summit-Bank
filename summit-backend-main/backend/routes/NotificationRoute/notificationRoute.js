const express = require("express");
const {
  getNotifications,
  markAsRead,
} = require("../../controller/Notification/NotificationController");

const auth = require("../../auth/jwtAuth");

const router = express.Router();

router.get("/", auth, getNotifications);
router.patch("/:id/read", auth, markAsRead);

module.exports = router;
