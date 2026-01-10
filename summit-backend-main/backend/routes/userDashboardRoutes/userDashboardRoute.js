const express = require("express");
const { getUserDashboardStats } = require("../../controller/userDashboard/userDashboardStats");
const auth = require("../../auth/jwtAuth");

const router = express.Router();

router.get("/dashboard", auth, getUserDashboardStats);

module.exports = router;
