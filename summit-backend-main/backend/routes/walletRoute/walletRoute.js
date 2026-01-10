const express = require("express");
const {
  getWallet,
  creditWallet,
  debitWallet,
  createWallet
} = require("../../controller/walletController/walletController");
const auth = require("../../auth/jwtAuth");
const User = require("../../models/User");
const bcrypt=require("bcryptjs")
const router = express.Router();

// Get wallet info
router.get("/", auth, getWallet);

//create a summit wallet
router.post("/create",auth,createWallet)

// Credit wallet (admin / system use only)
router.post("/credit", auth, async (req, res) => {
  try {
    const { amount, reference,} = req.body;
     const type = "deposit"
    const result = await creditWallet(req.user.id, amount, reference, type);

    res.json({ message: "Wallet credited successfully",result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Debit wallet
router.post("/debit", auth, async (req, res) => {
  try {
    const { amount, reference, type, pin } = req.body;

    // Validate PIN
    const user = await User.findById(req.user.id);

    if (!user.withdrawPin)
      return res.status(400).json({ msg: "Set withdrawal PIN first" });

    const match = await bcrypt.compare(pin, user.withdrawPin);
    if (!match)
      return res.status(400).json({ msg: "Invalid withdrawal PIN" });

    // Proceed with wallet debit
    await debitWallet(req.user.id, amount, reference, type);

    res.json({ message: "Withdrawal successful" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
