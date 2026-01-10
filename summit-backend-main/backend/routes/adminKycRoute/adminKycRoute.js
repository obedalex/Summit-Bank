const express = require("express");
const { getAllKYC, approveKYC, rejectKYC } = require("../../controller/adminKYCController/adminKYCController");
const adminAuth = require("../../auth/adminAuth");

const router = express.Router();

// Get all KYC submissions
router.get("/", adminAuth, getAllKYC);

// Approve KYC
router.put("/approve/:id", adminAuth, approveKYC);

// Reject KYC
router.put("/reject/:id", adminAuth, rejectKYC);

module.exports = router;
