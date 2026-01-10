const Transaction = require("../../models/Transaction.js");
const User = require("../../models/User.js");
const bcrypt = require("bcryptjs")

const uuid = require("uuid").v4;
const { creditWallet,debitWallet,getWallet } = require("../walletController/walletController.js");

const deposit = async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;

    const reference = uuid();

    const tx = await Transaction.create({
      userId: req.user.id,
      type: "deposit",
      status: "success",
      amount,
      paymentMethod,
      reference,
    });

    await creditWallet(req.user.id, amount, reference, "deposit");

    res.json({ message: "Deposit successful", tx });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const withdraw = async (req, res) => {
  try {
    const { amount, pin } = req.body;

    // 1. PIN must be provided
    if (!pin) {
      return res.status(400).json({ message: "Withdrawal PIN is required" });
    }

    // 2. Check if user has a PIN set
    const user = await User.findById(req.user.id);
    if (!user.withdrawPin) {
      return res.status(400).json({ message: "Set withdrawal PIN first" });
    }

    // 3. Compare provided PIN with hashed PIN
    const match = await bcrypt.compare(pin, user.withdrawPin);
    if (!match) {
      return res.status(400).json({ message: "Invalid withdrawal PIN" });
    }

    // 4. Generate reference
    const reference = uuid();

    // 5. Debit wallet (this function only updates wallet balance)
    await debitWallet(req.user.id, amount, reference, "withdraw");

    // 6. Create transaction record
    const tx = await Transaction.create({
      userId: req.user.id,
      type: "withdraw",
      amount,
      status: "success",
      reference,
    });

    res.json({ message: "Withdrawal successful", tx });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const getTransactions = async (req, res) => {
  try {
    const tx = await Transaction.find({ userId: req.user.id });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {getTransactions,withdraw,deposit}