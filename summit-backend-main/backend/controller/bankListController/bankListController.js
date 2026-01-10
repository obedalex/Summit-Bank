// controllers/bankController.js
const BankList = require("../../models/BanksList");
const { uploadToCloudinary } = require("../../utils/uploadToCloudinary");

// UTIL — generate random bank account number pattern
const generateAccountNumber = () => {
  const segment1 = Math.floor(10000 + Math.random() * 90000); // Transit (5 digits)
  const segment2 = "003"; // Example institution (can vary later)
  const segment3 = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
  return `${segment1}-${segment2}-${segment3}`;
};

// ========================
// ADD BANK
// ========================
// ADD BANK (fixed)
const addBank = async (req, res) => {
  try {
    const { bankName, country, swiftCode } = req.body;

    if (!bankName || !country || !swiftCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Bank logo is required" });
    }

    // Upload using BUFFER
    const upload = await uploadToCloudinary(req.file.buffer, "banks");

    const newBank = await BankList.create({
      bankName,
      country,
      swiftCode,
      bankLogo: upload.secure_url,
    });

    res.status(201).json({
      message: "Bank added successfully",
      data: newBank,
    });
  } catch (err) {
    console.error("Add Bank Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// GET ALL BANKS
// ========================
const getAllBanks = async (req, res) => {
  try {
    const banks = await BankList.find().sort({ bankName: 1 });

    res.json({
      count: banks.length,
      data: banks,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ========================
// GET SINGLE BANK
// ========================
const getBankById = async (req, res) => {
  try {
    const bank = await BankList.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    res.json(bank);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ========================
// UPDATE BANK
// ========================
const updateBank = async (req, res) => {
  try {
    const { bankName, swiftCode, country } = req.body;

    let updateData = { bankName, swiftCode, country };

    // If logo being updated
    if (req.file) {
      const upload = await uploadToCloudinary(req.file.path, "banks");
      updateData.bankLogo = upload.secure_url;
    }

    const updated = await BankList.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Bank not found" });
    }

    res.json({
      message: "Bank updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ========================
// DELETE BANK
// ========================
const deleteBank = async (req, res) => {
  try {
    const deleted = await BankList.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Bank not found" });
    }

    res.json({ message: "Bank deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    addBank,getAllBanks,deleteBank,getBankById,updateBank
}