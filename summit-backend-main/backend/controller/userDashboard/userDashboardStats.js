const Wallet = require("../../models/Wallet");
const Transaction = require("../../models/Transaction");
const Investment = require("../../models/Investment");

const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // WALLET
    const wallet = await Wallet.findOne({ userId });

    // TOTAL DEPOSITS
    const totalDeposits = await Transaction.aggregate([
      { $match: { userId, type: "deposit", status: "success" } },
      { $group: { _id: null, sum: { $sum: "$amount" } } }
    ]);

    // TOTAL WITHDRAWALS
    const totalWithdrawals = await Transaction.aggregate([
      { $match: { userId, type: "withdraw", status: "success" } },
      { $group: { _id: null, sum: { $sum: "$amount" } } }
    ]);

    // INVESTMENTS
    const totalInvestments = await Investment.countDocuments({ userId });
    const activeInvestments = await Investment.countDocuments({ userId, status: "active" });
    const completedInvestments = await Investment.countDocuments({ userId, status: "completed" });

    // TOTAL INVESTED AMOUNT
    const investedAmount = await Investment.aggregate([
      { $match: { userId } },
      { $group: { _id: null, sum: { $sum: "$amount" } } }
    ]);

    // TOTAL RETURNS (money earned)
    const totalReturns = await Investment.aggregate([
      { $match: { userId, status: "completed" } },
      { $group: { _id: null, sum: { $sum: "$actualReturn" } } }
    ]);

    // LAST 5 TRANSACTIONS
    const lastTransactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // LAST 5 INVESTMENTS
    const lastInvestments = await Investment.find({ userId })
      .populate("planId", "title interestRate")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({

      walletBalance: wallet?.balance || 0,

      totalDeposits: totalDeposits[0]?.sum || 0,
      totalWithdrawals: totalWithdrawals[0]?.sum || 0,

      totalInvestments,
      activeInvestments,
      completedInvestments,

      totalInvestedAmount: investedAmount[0]?.sum || 0,
      totalReturns: totalReturns[0]?.sum || 0,

      lastTransactions,
      lastInvestments
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserDashboardStats };
