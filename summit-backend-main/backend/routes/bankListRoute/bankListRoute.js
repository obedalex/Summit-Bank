// routes/bankRoutes.js
const express = require("express");
const router = express.Router();
const authAdmin = require("../../auth/adminAuth");
const { uploadImages } = require("../../multer/upload");

const {
  addBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank,
} = require("../../controller/bankListController/bankListController");

// Create new bank
router.post("/add", authAdmin, uploadImages.single("bankLogo"), addBank);

// Get all banks
router.get("/", getAllBanks);

// Get one bank
router.get("/:id", getBankById);

// Update bank
router.put("/:id", authAdmin, uploadImages.single("bankLogo"), updateBank);

// Delete bank
router.delete("/:id", authAdmin, deleteBank);

module.exports = router;
