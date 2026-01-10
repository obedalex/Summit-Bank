const express = require("express");
const { createPlan, getPlans } = require("../../controller/investmentPlannerController/investmentPlan");
const auth = require("../../auth/jwtAuth");

const router = express.Router();

// Only admins should ideally create plans, but for testing we use auth
router.post("/create", auth, createPlan);

// Get all active plans
router.get("/", getPlans);

module.exports = router;
