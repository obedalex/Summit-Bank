const Wallet = require("../../models/Wallet");

// Reset daily spent if the day has changed
const resetDailyLimitIfNeeded = async (wallet) => {
  const today = new Date().toDateString();
  const last = new Date(wallet.dailyStats.lastReset).toDateString();

  // New day → reset
  if (today !== last) {
    wallet.dailyStats.spentToday = 0;
    wallet.dailyStats.lastReset = new Date();
    await wallet.save();
  }

  return wallet;
};

// Validate all wallet transfer rules
const validateWalletLimits = async (_id, amount) => {
  const wallet = await Wallet.findById({_id});

  if (!wallet) throw new Error("Wallet not found");

  if (wallet.status !== "active")
    throw new Error(`Wallet is ${wallet.status}. Action not allowed.`);

  // Reset daily limits if needed
  await resetDailyLimitIfNeeded(wallet);

  // Check single-transfer limit
  if (amount > wallet.limits.maxSingleTransfer)
    throw new Error(
      `Transfer exceeds single limit: $${wallet.limits.maxSingleTransfer}`
    );

  // Check daily limit
  if (wallet.dailyStats.spentToday + amount > wallet.limits.maxDailyTransfer)
    throw new Error(
      `Daily limit exceeded. Max daily is $${wallet.limits.maxDailyTransfer}`
    );

  return wallet;
};

// After successful transfer → update daily spent
const updateDailySpent = async (_id, amount) => {
  await Wallet.findByIdAndUpdate({_id}, {
    $inc: { "dailyStats.spentToday": amount },
    $set: { "dailyStats.lastReset": new Date() }
  });
};

module.exports = {
  validateWalletLimits,
  updateDailySpent,
};
