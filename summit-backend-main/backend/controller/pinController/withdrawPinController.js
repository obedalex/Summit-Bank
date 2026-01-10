const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// Set or Update Withdrawal PIN
const setWithdrawPin = async (req, res) => {
  try {
    const { oldPin, newPin, pin } = req.body;

    let newPinValue = newPin || pin; // support both formats

    if (!newPinValue || newPinValue.length !== 4) {
      return res.status(400).json({ msg: "PIN must be exactly 4 digits" });
    }

    const user = await User.findById(req.user.id);

    // CASE 1: User already has a PIN — must verify old one
    if (user.withdrawPin) {
      if (!oldPin) {
        return res.status(400).json({ msg: "Old PIN is required" });
      }

      const isMatch = await bcrypt.compare(oldPin, user.withdrawPin);
      if (!isMatch) {
        return res.status(400).json({ msg: "Old PIN is incorrect" });
      }
    }

    // CASE 2: Set or update new PIN
    const hashedPin = await bcrypt.hash(newPinValue, 10);

    user.withdrawPin = hashedPin;
    await user.save();

    res.json({ msg: user.withdrawPin ? "PIN updated successfully" : "PIN set successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { setWithdrawPin };
