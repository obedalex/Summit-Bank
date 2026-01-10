const KYC = require("../../models/KYC");

// GET all KYC submissions (pending, approved, rejected)
const getAllKYC = async (req, res) => {
  try {
    const kycs = await KYC.find().populate("userId", "fullname email");
    res.json(kycs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPROVE KYC
const approveKYC = async (req, res) => {
  try {
    const kycId = req.params.id;

    const updated = await KYC.findByIdAndUpdate(
      kycId,
      {
        status: "approved",
        reviewedBy: req.admin.id
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "KYC not found" });

    res.json({
      message: "KYC approved successfully",
      kyc: updated
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REJECT KYC
const rejectKYC = async (req, res) => {
  try {
    const kycId = req.params.id;
    const { reason } = req.body;

    const updated = await KYC.findByIdAndUpdate(
      kycId,
      {
        status: "rejected",
        reviewedBy: req.admin.id,
        rejectionReason: reason || "No reason provided"
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "KYC not found" });

    res.json({
      message: "KYC rejected.",
      kyc: updated
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllKYC, approveKYC, rejectKYC };
